import { Processor, OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // Para leer URLs, etc.
import * as puppeteer from 'puppeteer';
import * as fs from 'fs/promises'; // Para guardar localmente (ejemplo)
import * as path from 'path'; // Para construir rutas de archivo

// Importamos el nombre de la cola
import { JwtService } from '@nestjs/jwt';
import { PDF_GENERATION_QUEUE } from './pdf-generation.token';


// Interfaz para la data esperada en el Job
interface PdfJobData {
    invoiceId: string;
    templateName: string;
    userId: string; // ID del usuario que solicita (para seguridad)
}

@Injectable() // Asegúrate de que sea Inyectable si necesita otras dependencias
@Processor(PDF_GENERATION_QUEUE, {
    concurrency: 2, // Procesar máximo 2 trabajos a la vez (ajusta según tus necesidades)
})
export class PdfGenerationProcessor extends WorkerHost {
    private readonly logger = new Logger(PdfGenerationProcessor.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
        // Aquí podrías inyectar otros servicios si los necesitas, ej:
        // private readonly invoiceService: InvoiceService, // Para obtener datos de factura si es necesario
        // private readonly storageService: StorageService, // Para subir a S3
    ) {
        super();
    }

    // Este método procesará los trabajos con el nombre 'generate-invoice-pdf'
    async process(job: Job<PdfJobData>) {
        const { invoiceId, templateName, userId } = job.data;
        this.logger.log(`Processing job ${job.id} for invoice ${invoiceId} with template ${templateName}`);

        let browser: puppeteer.Browser | null = null;
        try {
            // Generar Token de Impresión de Corta Duración
            // Creamos un token JWT especial solo para esta tarea
            const payload = {
                sub: userId,
                invoiceId: invoiceId,
                scope: 'print:invoice' // Un 'scope' específico
            };
            const printToken = this.jwtService.sign(payload, {
                expiresIn: '5m'
            })
            // Construimos la URL del frontend 
            const frontendBaseUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000'); // Lee desde .env
            const printUrl = `${frontendBaseUrl}/print/invoice/${invoiceId}?template=${templateName}&token=${printToken}`;
            this.logger.debug(`URL a renderizar: ${printUrl}`);

            // Lanzamos Puppeteer
            // Opciones para optimizar (especialmente en Docker/Linux)
            const launchOptions: puppeteer.LaunchOptions = {
                headless: true, // Ejecutamos sin UI
                args: [
                    '--no-sandbox', // Recomendado para Docker
                    '--disable-setuid-sandbox', // Recomendado para Docker
                    '--disable-dev-shm-usage', // Recomendado para Docker
                    '--disable-accelerated-2d-canvas', // Recomendado para Docker
                    '--no-first-run',
                    '--no-zygote', // Recomendado para Docker
                    '--disable-gpu', // Recomendado para Docker
                ],
                // executablePath: '/usr/bin/google-chrome-stable' // Podrías necesitar especificar la ruta si no usa el Chromium descargado
            };
            browser = await puppeteer.launch(launchOptions);
            const page = await browser.newPage();

            // Navegar y generar PDF
            await page.goto(printUrl, {
                waitUntil: 'networkidle0', // Esperar a que la red esté inactiva (se hayan cargado recursos)
                timeout: 30000 // Timeout de 30 segundos
            });

            // Opcional : Esperar a que un selector específico aparezca (si hay carga asíncrona)
            const pageTitle = await page.title();
            if(pageTitle.includes('404') || pageTitle.includes('Error')) {
                throw new Error(`Error al generar PDF para factura ${invoiceId}: ${pageTitle}`);
            }

            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true, // Incluye fondos CSS
                margin: { // Define márgenes si es necesario
                    top: '20mm',
                    bottom: '20mm',
                    left: '20mm',
                    right: '20mm',
                }
            });

            this.logger.log(`PDF generado para factura ${invoiceId} (Tamaño: ${pdfBuffer.length} bytes)`);

            // Guardar el PDF
            // Ejemplo : guardar localmente en una carpeta 'generated_pdfs'
            const outputDir = path.join(__dirname, '..', '..', 'generated_pdfs');
            await fs.mkdir(outputDir, { recursive: true }); // Asegura que el directorio exista
            const fileName = `factura-${invoiceId}-${Date.now()}.pdf`;
            const filePath = path.join(outputDir, fileName);
            await fs.writeFile(filePath, pdfBuffer);
            this.logger.log(`PDF guardado en ${filePath}`);

            // TODO: Subir a S3 y guardar URL en BBDD en el @OnQueueCompleted
            return { filePath: fileName }; // Devolvemos solo el nombre para OnQueueCompleted
        } catch (error) {
            const err = error as Error;
            this.logger.error(`Error procesando Job ${job.id} para factura ${invoiceId}: ${err.message}`, err.stack);
            // Relanzar el error para que BullMQ marque el job como fallido y aplique reintentos
            throw err;
        } finally {
            // Cerramos el navegador si lo abrimos
            if (browser) {
                await browser.close();
            }
        }
    }

    // HANDLERS DE EVENTOS DE LA COLA ( OPCIONAL PERO ÚTIL )

    @OnWorkerEvent('active')
    onActive(job: Job) {
        this.logger.log(`Job ${job.id} para factura ${job.data.invoiceId} ha comenzado`);
    }
    @OnWorkerEvent('completed')
    onCompleted(job: Job, result: any) {
        this.logger.log(`Job ${job.id} completado con resultado: ${JSON.stringify(result)}`);
        // Aquí podrías:
        // 1. Guardar la URL/ruta del PDF en la base de datos (asociada a la factura).
        // 2. Enviar una notificación al usuario (WebSocket, email, etc.).
        //    Ej: this.notificationService.notifyUser(job.data.userId, `Tu PDF ${result.filePath} está listo.`);
    }

    @OnWorkerEvent('failed')
    onFailed(job: Job, err: Error) {
        this.logger.error(`Job ${job.id} falló después de ${job.attemptsMade} intentos con error: ${err.message}`, err.stack);
        // Aquí podrías enviar una notificación de error al usuario o a un sistema de monitoreo.
    }
}

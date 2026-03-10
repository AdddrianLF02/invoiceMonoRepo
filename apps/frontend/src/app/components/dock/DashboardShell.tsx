"use client"

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingDock from "./FloatingDock";
import UserMenu from "../auth/UserMenu";
import { FileText } from "lucide-react";

// --- Los panels se importan lazy para code-splitting ---
// Cada panel es un componente client que recibe el accessToken
import DashboardPanel from "@/app/components/panels/DashboardPanel";
import InvoicesPanel from "@/app/components/panels/InvoicesPanel";
import CustomersPanel from "@/app/components/panels/CustomersPanel";
import CreateInvoicePanel from "@/app/components/panels/CreateInvoicePanel";
import ProfilePanel from "@/app/components/panels/ProfilePanel";
import Image from "next/image";


interface DashboardShellProps {
    accessToken: string;
    userEmail: string;
}

// -- Variants para la transición del content box ----
// Definimos las animaciones de entrada/salida
const panelVariants = {
    initial: { opacity: 0, y: 15, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -15, filter: "blur(4px)" }

}

export default function DashboardShell({ accessToken, userEmail }: DashboardShellProps) {
    const [activePanel, setActivePanel] = useState("dashboard");
    // ── Renderiza el panel activo ──
    // Cada panel recibe el accessToken para hacer fetch
    const renderPanel = () => {
        switch (activePanel) {
            case "dashboard":
                return <DashboardPanel accessToken={accessToken} />;
            case "invoices":
                return <InvoicesPanel accessToken={accessToken} />;
            case "customers":
                return <CustomersPanel accessToken={accessToken} />;
            case "create":
                return <CreateInvoicePanel accessToken={accessToken} />;
            case "profile":
                return <ProfilePanel userEmail={userEmail} />;
            default:
                return <DashboardPanel accessToken={accessToken} />;
        }
    };
    return (
        <div className="min-h-screen bg-background pb-24">
            {/* ── Top Bar Minimal ── */}
            <div className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-14">
                        <div className="flex items-center gap-2">
                            <Image src="./favicon.ico" width={40} height={40} alt="" />
                            <span className="text-lg font-extrabold tracking-tight">InvoiceFlow</span>
                        </div>
                        <UserMenu />
                    </div>
                </div>
            </div>
            {/* ── Content Box con transiciones ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activePanel}
                        variants={panelVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        {renderPanel()}
                    </motion.div>
                </AnimatePresence>
            </div>
            {/* ── Floating Dock ── */}
            <FloatingDock activeId={activePanel} onSelect={setActivePanel} />
        </div>
    );
}


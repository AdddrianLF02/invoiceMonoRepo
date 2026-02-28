"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    FileText,
    Users,
    Plus,
    User,
} from "lucide-react";

// ── Definimos los items del dock como configuración ──
// Esto sigue el Open/Closed Principle: para añadir una sección
// solo añades un item aquí, sin tocar el componente.
export type DockItem = {
    id: string;
    label: string;
    icon: React.ReactNode;
};

export const DOCK_ITEMS: DockItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { id: "invoices", label: "Facturas", icon: <FileText className="h-5 w-5" /> },
    { id: "customers", label: "Clientes", icon: <Users className="h-5 w-5" /> },
    { id: "create", label: "Crear", icon: <Plus className="h-5 w-5" /> },
    { id: "profile", label: "Perfil", icon: <User className="h-5 w-5" /> },
];
interface FloatingDockProps {
    activeId: string;
    onSelect: (id: string) => void;
}
export default function FloatingDock({ activeId, onSelect }: FloatingDockProps) {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="flex items-center gap-2 px-4 py-3 rounded-2xl 
                   bg-background/80 backdrop-blur-xl border border-border
                   shadow-lg shadow-black/5"
            >
                {DOCK_ITEMS.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => onSelect(item.id)}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.95 }}
                            className={`
                relative flex flex-col items-center justify-center 
                w-12 h-12 rounded-xl transition-colors duration-200
                ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                }
              `}
                            title={item.label}
                        >
                            {item.icon}
                            {/* Dot indicator para el item activo */}
                            {isActive && (
                                <motion.div
                                    layoutId="dock-indicator"
                                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary-foreground"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}
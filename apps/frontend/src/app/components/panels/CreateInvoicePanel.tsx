"use client";

import React from "react";
import InvoiceGenerator from "../invoice/components/InvoiceGenerator";

interface Props {
    accessToken: string;
}

export default function CreateInvoicePanel({ accessToken }: Props) {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {/* 
        Dado que InvoiceGenerator tiene sus propios márgenes grandes (max-w-7xl, px-4, etc), 
        usamos márgenes negativos para que ocupe todo el ancho del "cajón" del DashboardShell
        sin verse doblemente acolchado.
      */}
            <div className="-mx-4 sm:-mx-6 -mt-6">
                <InvoiceGenerator />
            </div>
        </div>
    );
}

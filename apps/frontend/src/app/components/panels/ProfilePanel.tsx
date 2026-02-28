"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export default function ProfilePanel({ userEmail }: { userEmail: string }) {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Perfil</h1>
            <Card>
                <CardContent className="p-5 space-y-4">
                    <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="font-medium">{userEmail}</p>
                    </div>
                    <Button variant="destructive" onClick={() => signOut({ callbackUrl: "/login" })}>
                        Cerrar sesión
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

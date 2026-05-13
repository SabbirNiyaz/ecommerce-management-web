import { useMemo } from "react";

interface JwtPayload {
    id: number;
    name: string;
    email: string;
    role: string;
    // add other fields token contains
}

export function useAuth(): JwtPayload | null {
    return useMemo(() => {
        // SSR guard
        if (typeof window === "undefined") return null;

        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const payload = token.split(".")[1];
            return JSON.parse(atob(payload)) as JwtPayload;
        } catch {
            return null;
        }
    }, []);
}
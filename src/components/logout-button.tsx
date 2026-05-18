"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function LogoutButton() {
    const router = useRouter()

    const handleLogout = () => {
        // Clear cookie
        document.cookie = "accessToken=; path=/; max-age=0"

        // Clear localStorage
        localStorage.removeItem("token")

        // Redirect to login
        router.push("/login")
    }

    return (
        <Button
            className="bg-red-600 hover:bg-red-700 border-md rounded-sm cursor-pointer"
            onClick={handleLogout}>
            Logout
        </Button>
    )
}
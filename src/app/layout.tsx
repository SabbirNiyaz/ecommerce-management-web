import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "react-hot-toast"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "E-commerce Management Web",
  description: "A E-commerce Management Website built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col dark:bg-gray-900"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex-1">
            {children}
          </main>

          {/* TOASTER */}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,

              className:
                "text-sm rounded-lg shadow-lg px-4 py-2",

              success: {
                className:
                  "bg-green-600 text-white text-sm rounded-lg shadow-lg px-4 py-2",
              },

              error: {
                className:
                  "bg-red-600 text-white text-sm rounded-lg shadow-lg px-4 py-2",
              },
            }}
          />

        </ThemeProvider>
      </body>
    </html>
  )
}
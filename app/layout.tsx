import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {icons} from "lucide-react";
import {ConvexProvider} from "convex/react";
import ConvexClientProvider from "@/app/ConvexClientProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Podcastr",
    description: "Generated your podcast using AI",
    icons: {
        icon: '/icons/logo.svg'
    }
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
        </html>
    );
}

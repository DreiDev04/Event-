import type { Metadata } from "next";
import { Mulish as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "300",
});

export const metadata: Metadata = {
  title: "Event++",
  description: "A calendar for campus events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>{String(metadata.title)}</title>
          <meta name="description" content={String(metadata.description)} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content={String(metadata.title)} />
          <meta
            property="og:description"
            content={String(metadata.description)}
          />
          <meta property="og:type" content="website" />
          <link rel="icon" href="/icons/calendar.png" />
        </head>

        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <ModeToggle />
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}

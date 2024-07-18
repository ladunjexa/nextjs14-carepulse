import React from "react";
import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

import { cn } from "@/lib/utils";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse — Healthcare Management System",
  description: `CarePulse is an healthcare management application that allows patients to schedule their
                appointments, and also allows doctors to manage their appointments and patients. The application is
                built with Next.js, Tailwind CSS, Shadcn UI, Appwrite, Twilio and Sentry.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-dark-300 font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

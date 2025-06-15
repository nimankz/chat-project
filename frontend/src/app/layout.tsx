import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import "./globals.css"; // Keep if you have custom styles
import '@mantine/core/styles.css';

export const metadata: Metadata = {
  title: "Your Custom Title", // Keep your title
  description: "Your Custom Description", // Keep your description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" />
        <title>realtime-chat-app</title>
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
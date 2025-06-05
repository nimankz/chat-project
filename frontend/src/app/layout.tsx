import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import "./globals.css"; // Keep if you have custom styles

export const metadata: Metadata = {
  title: "Your Custom Title", // Keep your title
  description: "Your Custom Description", // Keep your description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
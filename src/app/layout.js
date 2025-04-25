import ScrollbarProvider from "@/components/ScrollbarProvider";
import "./globals.css";
import ConstellationBg from "@/components/ConstellationBG";

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative bg-neutral-900 text-white">
        <ConstellationBg />
        <ScrollbarProvider>{children}</ScrollbarProvider>
      </body>
    </html>
  );
}

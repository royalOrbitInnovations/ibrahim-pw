import ScrollbarProvider from "@/components/ScrollbarProvider";
import "./globals.css";
import ConstellationBg from "@/components/ConstellationBG";
import Script from "next/script";

export const metadata = {
  title: "Ibrahim Khalil Janneh",
  description:
    "The portfolio of Ibrahim Khalil Janneh, showcasing his books, blogs, podcasts, and more.",
  keywords: ["Ibrahim Khalil Janneh", "Ibrahim Qatar"],
  authors: [{ name: "Melvin Prince", url: "https://www.melvinprince.io" }],
  creator: "Melvin Prince",
  metadataBase: new URL("https://ibrahim-pw.vercel.app"),
  openGraph: {
    title: "Ibrahim Khalil Janneh",
    description:
      "The portfolio of Ibrahim Khalil Janneh, showcasing his books, blogs, podcasts, and more.",
    url: "https://ibrahim-pw.vercel.app",
    siteName: "Ibrahim Khalil Janneh",
    locale: "en_QA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibrahim Khalil Janneh",
    description:
      "The portfolio of Ibrahim Khalil Janneh, showcasing his books, blogs, podcasts, and more.",
    site: "@ibrahim_khalil_janneh",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://ibrahim-pw.vercel.app",
    languages: {
      "en-QA": "https://ibrahim-pw.vercel.app",
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <Script id="jsonld-organization" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Ibrahim Khalil Janneh",
            url: "https://ibrahim-pw.vercel.app",
            logo: "https://ibrahim-pw.vercel.app/logo.png", // <-- update logo if you have it
            description: "",
            founder: {
              "@type": "Person",
              name: "Ibrahim",
            },
            contactPoint: {
              "@type": "ContactPoint",
              email: "info@ibrahim-pw.vercel.app", // <-- update email if real
              contactType: "Customer Support",
            },
            sameAs: [],
          })}
        </Script>

        {/* JSON-LD Credit to Website Creator */}
        <Script id="jsonld-creator" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Melvin Prince",
            url: "https://www.melvinprince.io",
            jobTitle: "Full Stack Developer",
          })}
        </Script>
      </head>
      <body className="relative bg-neutral-900 text-white">
        <ConstellationBg />
        <ScrollbarProvider>{children}</ScrollbarProvider>
      </body>
    </html>
  );
}

import "./globals.css";
import { Inter } from "next/font/google";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
//content that needs to be on all pages
//children is the content in components
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ReactQueryProvider>
  );
}

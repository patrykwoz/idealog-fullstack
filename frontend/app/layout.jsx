import { DM_Mono } from "next/font/google";
import "./globals.css";

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ["latin"]
});

export const metadata = {
  title: "Idealog",
  description: "Your research assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmMono.className}>{children}</body>
    </html>
  );
}

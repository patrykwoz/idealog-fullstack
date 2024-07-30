import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ["latin"]
});

const dmSans = DM_Sans({
  weight: ['400', '500'],
  subsets: ["latin"]
});

export const metadata = {
  title: "Idealog",
  description: "Your research assistant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}

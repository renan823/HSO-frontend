import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  	title: "HSO - Dashboard"
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  	return (
    	<html lang="pt-br">
      		<body className={inter.className}>
			  	<Toaster position="top-right" toastOptions={{ style: { borderColor: "#4c1d95", borderWidth: 2 } }}/>
				{children}
			</body>
    	</html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navigator from "@/components/Navigator";
import AuthProvider from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"], style: "normal" });

export const metadata: Metadata = {
  	title: "HSO - Dashboard"
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  	return (
    	<html lang="pt-br">
      		<body className={`${ inter.className } flex flex-col items-center h-screen bg-slate-900`}>
			  	<Toaster position="bottom-right" toastOptions={{ style: { fontSize: 16, fontWeight: "bold" } }}/>
				<AuthProvider>
					<Navigator/>
					<div className="flex flex-col w-full h-full items-center justify-center overflow-y-auto p-6">
						{children}
					</div>
				</AuthProvider>
			</body>
    	</html>
  );
}

import "./globals.css";
import CartContextProvider from "../components/ecommerce/CartContext";
import { Inter } from "next/font/google";
import Providers from "../components/chatbot/Providers";
import Chat from "../components/chatbot/Chat";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Site ecommerce",
	description: "Develloper par Titouan",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="fr">
			<CartContextProvider>
				<Providers>
					<body className={inter.className}>
						<Chat />
						{children}
					</body>
				</Providers>
			</CartContextProvider>
		</html>
	);
}

import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "Restaurant Depot | Where Restaurants Shop",
  description:
    "Restaurant Depot — foodservice distribution mockup for presentation purposes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />

            <main className="min-h-screen">
              {children}
            </main>

            <Footer />
            <ChatWidget />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
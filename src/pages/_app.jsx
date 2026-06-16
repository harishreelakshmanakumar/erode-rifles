import "@/app/globals.css";
import { RouterProvider } from "@/context/RouterContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <RouterProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Component {...pageProps} />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </RouterProvider>
  );
}

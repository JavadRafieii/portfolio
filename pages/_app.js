import "@/styles/globals.css";
import Header from "@/components/header/Header";

export default function App({ Component, pageProps }) {
  return (
    <main className="overflow-hidden">
      <Header />
      <Component {...pageProps} />
    </main>
  );
}

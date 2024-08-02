import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <main className="overflow-hidden">
      <Component {...pageProps} />
    </main>
  );
}

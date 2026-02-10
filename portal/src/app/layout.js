import "./globals.css";

export const metadata = {
  title: "Dynastry - Family Tree Explorer",
  description: "A tree-mendous family tree application for exploring your genealogical history",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

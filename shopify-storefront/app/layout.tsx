import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopify Storefront",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0 }}>
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem 2rem",
            borderBottom: "1px solid #eee",
          }}
        >
          <a href="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
            Store
          </a>
          <a href="/cart" style={{ textDecoration: "none" }}>
            Cart
          </a>
        </nav>
        {children}
      </body>
    </html>
  );
}

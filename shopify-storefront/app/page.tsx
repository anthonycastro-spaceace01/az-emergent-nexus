import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/shopify-queries";
import type { Product } from "@/lib/shopify-types";
import { AddToCartButton } from "./add-to-cart-button";

export default async function HomePage() {
  const data = await shopifyFetch<{ products: { nodes: Product[] } }>(
    PRODUCTS_QUERY,
    { first: 12 }
  );

  const products = data.products.nodes;

  return (
    <div className="site-shell">
      <nav className="site-nav">
        <a className="brand" href="/" aria-label="Nexus home">
          <span className="brand-mark"><span>+</span></span>
          <span className="brand-name">Nexus / 01</span>
        </a>
        <div className="nav-meta">
          <span className="nav-status">Systems online</span>
          <a className="cart-link" href="/cart">Cart / 00</a>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="kicker">Private instruments for public reality</p>
            <h1>Think deeper.<br /><span className="hero-highlight">See further.</span></h1>
            <p className="hero-lede">
              Two guided systems for the moments when ordinary reflection is not enough. Find your highest-performing mind, then explore the dimensions beneath it.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#systems">Enter the systems</a>
              <a className="secondary-link" href="#access">How access works</a>
            </div>
          </div>
        </section>

        <div className="signal-strip" id="access">
          <div className="signal"><strong>01 / Browser-native</strong><span>No download. Your guidebook opens the experience instantly.</span></div>
          <div className="signal"><strong>02 / AI-facilitated</strong><span>Prompts and dialogue that respond to the shape of your thinking.</span></div>
          <div className="signal"><strong>03 / Self-directed</strong><span>Move at your own pace through structured, repeatable sessions.</span></div>
        </div>

        <section className="section" id="systems">
          <div className="section-heading">
            <div>
              <span className="section-label">Choose your instrument</span>
              <h2 className="section-title">Two ways in.</h2>
            </div>
            <p className="section-note">Your purchase includes the guidebook and QR access to the browser-based experience.</p>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">No systems are currently available.</div>
          ) : (
            <div className="product-grid">
              {products.slice(0, 2).map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div className="product-visual">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText ?? product.title}
                        fill
                        sizes="(max-width: 720px) 100vw, 50vw"
                      />
                    ) : (
                      <span className="product-visual-empty">Signal / {String(index + 1).padStart(2, "0")}</span>
                    )}
                  </div>
                  <div className="product-info">
                    <span className="product-index">System / {String(index + 1).padStart(2, "0")}</span>
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-description">
                      {index === 0
                        ? "Extract the conditions where your knowledge, creativity, logic, intuition, and experience converge."
                        : "Explore perception, memory, bodily awareness, and future-oriented thought through guided sessions."}
                    </p>
                    <div className="product-bottom">
                      <span className="price">
                        ${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)} <small>{product.priceRange.minVariantPrice.currencyCode}</small>
                      </span>
                      {product.variants.nodes.length > 0 && (
                        <AddToCartButton
                          variantId={product.variants.nodes[0].id}
                          availableForSale={product.availableForSale}
                        />
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="site-footer">Nexus / Cognitive systems for the next version of you</footer>
    </div>
  );
}

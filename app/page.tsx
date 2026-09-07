import Image from "next/image";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/shopify-queries";
import type { Product } from "@/lib/shopify-types";
import { AddToCartButton } from "./add-to-cart-button";

export const dynamic = "force-dynamic";

const experienceLinks = [
  "https://quadram-i-n-d-s-sight.vercel.app/",
  "https://mind-forge-2-0.vercel.app/",
];
const substackLink = "https://substack.com/@anthonycastro33";

export default async function HomePage() {
  let products: Product[] = [];

  try {
    const data = await shopifyFetch<{ products: { nodes: Product[] } }>(
      PRODUCTS_QUERY,
      { first: 100 }
    );
    products = data.products.nodes;
  } catch (error) {
    console.error("Unable to load Shopify products", error);
  }

  return (
    <div className="site-shell">
      <nav className="site-nav">
        <Link className="brand" href="/" aria-label="AZ Emergent Nexus home">
          <span className="brand-mark"><span>+</span></span>
          <span className="brand-name">AZ Emergent Nexus</span>
        </Link>
        <div className="nav-meta">
          <span className="nav-status">Systems online</span>
        </div>
      </nav>

      <main>
        <section className="hero">
          <a className="hero-portal" href={substackLink} rel="noreferrer" target="_blank" aria-label="Enter the AZ Emergent Nexus Substack portal">
            <span className="portal-glow" />
            <span className="sigil-ring sigil-ring-outer" />
            <span className="sigil-ring sigil-ring-middle" />
            <span className="sigil-ring sigil-ring-inner" />
            <span className="sigil-cross sigil-cross-horizontal" />
            <span className="sigil-cross sigil-cross-vertical" />
            <span className="sigil-diamond" />
            <span className="sigil-core">&#x2299;</span>
            <span className="sigil-binary sigil-binary-top">101&nbsp;001&nbsp;011</span>
            <span className="sigil-binary sigil-binary-bottom">010&nbsp;110&nbsp;101</span>
            <span className="sigil-glyph sigil-glyph-left">&#x2641;</span>
            <span className="sigil-glyph sigil-glyph-right">&#x2642;</span>
            <span className="portal-label">Enter / Substack</span>
          </a>
          <div className="hero-copy">
            <p className="kicker">Shop / browser-based experiences</p>
            <h1>Choose your next<br /><span className="hero-highlight">experience.</span></h1>
            <p className="hero-lede">
              Buy access through Shopify, then open the digital experience built for the way you think, create, and see the world.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#systems">Shop experiences</a>
              <a className="secondary-link" href="#access">How it works</a>
            </div>
          </div>
        </section>

        <div className="signal-strip" id="access">
          <div className="signal"><strong>01 / Choose</strong><span>Find the experience that matches your current line of inquiry.</span></div>
          <div className="signal"><strong>02 / Purchase</strong><span>Complete checkout securely through Shopify.</span></div>
          <div className="signal"><strong>03 / Enter</strong><span>Open your browser-based experience and begin.</span></div>
        </div>

        <section className="section" id="systems">
          <div className="section-heading">
            <div>
              <span className="section-label">Shop the collection</span>
              <h2 className="section-title">Available experiences.</h2>
            </div>
            <p className="section-note">Purchase through Shopify, then open the experience linked to your product.</p>
          </div>

          <div className="experience-destinations" aria-label="Experience links">
            {experienceLinks.map((link, index) => (
              <a
                className="experience-destination"
                href={link}
                key={link}
                rel="noreferrer"
                target="_blank"
              >
                <span>Experience / {String(index + 1).padStart(2, "0")}</span>
                <strong>{index === 0 ? "QUADRAM.I.N.D.Sight." : "Mind Forge"}</strong>
                <em>Open experience</em>
              </a>
            ))}
          </div>

          {products.length === 0 ? (
            <div className="empty-state">No systems are currently available.</div>
          ) : (
            <div className="product-grid">
              {products.map((product, index) => (
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
                      {product.description || "Explore this system through a guided browser-based experience."}
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
                    {experienceLinks[index] && (
                      <a
                        className="experience-link"
                        href={experienceLinks[index]}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Open experience
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <footer className="site-footer">AZ Emergent Nexus / Cognitive systems for the next version of you</footer>
    </div>
  );
}

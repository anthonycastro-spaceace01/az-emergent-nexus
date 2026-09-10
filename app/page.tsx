import Image from "next/image";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/lib/shopify-queries";
import type { Product } from "@/lib/shopify-types";
import { AddToCartButton } from "./add-to-cart-button";

export const dynamic = "force-dynamic";

const hasShopifyConfiguration = Boolean(
  process.env.SHOPIFY_STORE_DOMAIN?.trim() &&
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim()
);

type Experience = {
  name: string;
  subtitle: string;
  href?: string;
  comingSoon?: boolean;
};

const experiences: Experience[] = [
  {
    name: "QUADRAMINDS",
    subtitle: "QUADRAM.I.N.D.Sight.",
    href: "https://quadram-i-n-d-s-sight.vercel.app/",
  },
  {
    name: "CONVERGENCE FORM EXTRACTOR",
    subtitle: "Mind Forge 2.0",
    href: "https://mind-forge-2-0.vercel.app/",
  },
  {
    name: "QuadraSeer",
    subtitle: "Axiom Zeta control layer",
    comingSoon: true,
  },
];

function ExperienceAccessActions({ experience }: { experience: Experience }) {
  if (experience.comingSoon) {
    return (
      <div className="experience-actions">
        <span className="experience-pending">Coming Soon</span>
      </div>
    );
  }

  if (!experience.href) {
    return null;
  }

  return (
    <div className="experience-actions">
      <a
        className="current-members-button"
        href={experience.href}
        rel="noreferrer"
        target="_blank"
      >
        Current Members
      </a>
      <a
        className="new-members-button"
        href={experience.href}
        rel="noreferrer"
        target="_blank"
      >
        New Members
      </a>
    </div>
  );
}

const substackLink = "https://substack.com/@anthonycastro33";
const cryptoApps = [
  {
    name: "HyperCross Nexus",
    description: "Core intelligence and strategy: analyze markets, portfolios, blockchain activity, DeFi, liquidity, risk, and trade setups through an explainable decision process.",
  },
  {
    name: "HyperCross Nexus Arm Xero",
    description: "The optional execution companion that prepares or executes approved strategies with authorization, position limits, routing, and transaction-level risk controls.",
  },
  {
    name: "Ameterasu HCN Companion",
    description: "The conversational interface for understanding Nexus analysis, portfolio exposure, signals, opportunities, and risk without acting as an autonomous trading engine.",
  },
];

export default async function HomePage() {
  let products: Product[] = [];

  if (hasShopifyConfiguration) {
    try {
      const data = await shopifyFetch<{ products: { nodes: Product[] } }>(
        PRODUCTS_QUERY,
        { first: 100 }
      );
      products = data.products.nodes;
    } catch (error) {
      console.error("Unable to load Shopify products", error);
    }
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
          <a className="hero-portal" href={substackLink} rel="noreferrer" target="_blank" aria-label="Enter The Singularity Point">
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
            <span className="portal-label">The Singularity Point</span>
          </a>
          <div className="hero-copy">
            <p className="kicker">Shop / browser-based experiences</p>
            <h1>Choose your next<br /><span className="hero-highlight">experience.</span></h1>
            <p className="hero-lede">
              Open the digital experience built for the way you think, create, and see the world.
            </p>
            <div className="hero-actions">
              <a className="primary-link" href="#systems">Shop experiences</a>
              <a className="secondary-link" href="#hypercross">Explore HyperCross</a>
              <a className="secondary-link" href="#quadraseer">Explore QuadraSeer</a>
              <a className="secondary-link" href="#access">How it works</a>
            </div>
          </div>
        </section>

        <div className="signal-strip" id="access">
          <div className="signal"><strong>01 / Choose</strong><span>Find the experience that matches your current line of inquiry.</span></div>
          <div className="signal"><strong>02 / Access</strong><span>Enter the experience and begin your next line of inquiry.</span></div>
          <div className="signal"><strong>03 / Enter</strong><span>Open your browser-based experience and begin.</span></div>
        </div>

        <section className="section" id="systems">
          <div className="section-heading">
            <div>
              <span className="section-label">Shop the collection</span>
              <h2 className="section-title">Available experiences.</h2>
            </div>
            <p className="section-note">Explore the experience linked to each system.</p>
          </div>

          <div className="experience-destinations" aria-label="Experience links">
            {experiences.map((exp, index) => (
              <div className="experience-destination" key={exp.name}>
                <span>Experience / {String(index + 1).padStart(2, "0")}</span>
                <strong>{exp.name}</strong>
                <em className="experience-subtitle">{exp.subtitle}</em>
                <ExperienceAccessActions experience={exp} />
              </div>
            ))}
          </div>

          <a
            className="featured-experience"
            href="https://www.transcendentalprescience.com"
            rel="noreferrer"
            target="_blank"
          >
            <div className="featured-experience-image">
              <Image
                src="/axiom-and-ash.svg"
                alt="Axiom and Ash: Cyber Scribe Forge"
                fill
                sizes="(max-width: 720px) 100vw, 40vw"
              />
            </div>
            <div className="featured-experience-copy">
              <span className="section-label">Featured link / 03</span>
              <h3>Axiom and Ash: Cyber Scribe Forge</h3>
              <p>Enter the forge at Transcendental Prescience.</p>
              <span className="featured-experience-cta">Visit site</span>
            </div>
          </a>

          <div id="product-catalog">
            {products.length > 0 && (
              <div className="product-grid">
                {products.map((product, index) => (
                  <article className="product-card" id={`product-card-${index}`} key={product.id}>
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
                      {experiences[index] && (
                        <ExperienceAccessActions experience={experiences[index]} />
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section crypto-apps" id="hypercross">
          <div className="section-heading">
            <div>
              <span className="section-label">Crypto application suite</span>
              <h2 className="section-title">HyperCross.</h2>
            </div>
            <p className="section-note">Three surfaces for navigating and executing your HyperCross workflows.</p>
          </div>

          <div className="crypto-app-grid" aria-label="HyperCross application links">
            {cryptoApps.map((app, index) => (
              <article className="crypto-app" key={app.name}>
                <span className="product-index">App / {String(index + 1).padStart(2, "0")}</span>
                <h3>{app.name}</h3>
                <p>{app.description}</p>
                <span className="crypto-app-pending">Coming Soon</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section quadraseer" id="quadraseer">
          <div className="section-heading">
            <div>
              <span className="section-label">Axiom Zeta control layer</span>
              <h2 className="section-title">QuadraMatrixA.I.</h2>
            </div>
            <p className="section-note">Operating intelligence that coordinates the ecosystem around every task.</p>
          </div>

          <article className="quadraseer-panel">
            <div className="quadraseer-copy">
              <span className="product-index">Orchestrate / route / govern</span>
              <h3>The system around the intelligence.</h3>
              <p>
                QuadraMatrixA.I. coordinates AI tools, applications, policies, workflows, knowledge sources, and local computational resources through one unified control surface.
              </p>
              <p>
                It determines the right model, service, or hardware for each task while enforcing permissions, resource limits, and safety boundaries across HRM, PhaseLock, Sovereign Vault, and specialized applications.
              </p>
              <span className="quadraseer-pending">Coming Soon</span>
            </div>
            <div className="quadraseer-map" aria-hidden="true">
              <span className="quadraseer-core">Quadra<br />Matrix</span>
              <span className="quadraseer-node quadraseer-node-hrm">HRM</span>
              <span className="quadraseer-node quadraseer-node-phase">PhaseLock</span>
              <span className="quadraseer-node quadraseer-node-vault">Sovereign Vault</span>
              <span className="quadraseer-node quadraseer-node-local">Local Compute</span>
            </div>
          </article>
        </section>
      </main>
      <footer className="site-footer">AZ Emergent Nexus / Cognitive systems for the next version of you</footer>
    </div>
  );
}

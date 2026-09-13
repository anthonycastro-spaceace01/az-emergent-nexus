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

const upcomingExperiences = [
  {
    name: "QuadraM.I.N.D.-Sight",
    subtitle: "Founder-ready product architecture, mapped before build.",
  },
  {
    name: "CONVERGENCE FORM EXTRACTOR",
    subtitle: "Mind Forge 2.0",
  },
  {
    name: "EqualiF.I. Financial Planner",
    subtitle: "Personal finance intelligence",
  },
  {
    name: "QuadraSeer",
    subtitle: "Axiom Zeta control layer",
  },
] as const;

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
          <div className="hero-orbit" aria-hidden="true">
            <span className="orbit-path orbit-path-one" />
            <span className="orbit-path orbit-path-two" />
            <span className="orbit-path orbit-path-three" />
          </div>
          <div className="hero-copy">
            <p className="kicker">AZ Emergent Nexus / System 001</p>
            <h1>Enter the<br /><span className="hero-highlight">nexus.</span></h1>
            <p className="hero-lede">Cognitive systems for the next version of you.</p>
          </div>
          <a className="hero-portal" href={substackLink} rel="noreferrer" target="_blank" aria-label="Enter The Singularity Point">
            <span className="portal-stars" />
            <span className="portal-glow" />
            <span className="sigil-ring sigil-ring-outer" />
            <span className="sigil-ring sigil-ring-middle" />
            <span className="sigil-ring sigil-ring-inner" />
            <span className="sigil-cross sigil-cross-horizontal" />
            <span className="sigil-cross sigil-cross-vertical" />
            <span className="sigil-diamond" />
            <span className="sigil-petal sigil-petal-one" />
            <span className="sigil-petal sigil-petal-two" />
            <span className="sigil-petal sigil-petal-three" />
            <span className="sigil-petal sigil-petal-four" />
            <span className="portal-interface">
              <span className="portal-eyebrow">Nexus Interface</span>
              <strong>The Singularity<br />Point</strong>
              <span className="portal-status">Ready / Enter below</span>
            </span>
            <span className="portal-label">Initialize Nexus</span>
          </a>
          <div className="hero-actions">
            <a className="primary-link" href="#systems">Explore systems</a>
            <a className="secondary-link" href="#mvp-blueprinting">MVP Blueprinting</a>
            <a className="secondary-link" href="#coming-soon">Coming soon</a>
            <a className="secondary-link" href="#access">Access protocol</a>
          </div>
          <div className="hero-readout" aria-hidden="true">
            <span>Signal 93.7%</span>
            <span>Orbit stable</span>
            <span>Node AZ-01</span>
          </div>
        </section>

        <div className="signal-strip" id="access">
          <div className="signal"><strong>01 / Choose</strong><span>Find the experience that matches your current line of inquiry.</span></div>
          <div className="signal"><strong>02 / Access</strong><span>Enter the experience and begin your next line of inquiry.</span></div>
          <div className="signal"><strong>03 / Enter</strong><span>Open your browser-based experience and begin.</span></div>
        </div>

        <section className="section" id="mvp-blueprinting">
          <div className="section-heading">
            <div>
              <span className="section-label">Consulting / architecture mapping</span>
              <h2 className="section-title">MVP Blueprinting</h2>
            </div>
            <p className="section-note">A premium advisory package that turns a concept into a decision-ready product roadmap.</p>
          </div>

          <article className="quadraseer-panel">
            <div className="quadraseer-copy">
              <span className="product-index">Fixed-fee advisory</span>
              <h3>Build confidence before you spend on engineering.</h3>
              <p>
                Many founders have an app idea but no technical roadmap. This consulting engagement is designed for that exact moment: you bring the vision, and I map the system before a single line of code is written.
              </p>
              <p>
                I conduct a focused discovery process, then deliver a comprehensive Build Document outlining the recommended tech stack, database architecture, core workflows, and basic wireframes so you can move forward with clarity instead of blind development costs.
              </p>
            </div>
            <div className="quadraseer-map" aria-hidden="true">
              <span className="quadraseer-core">Build<br />Plan</span>
              <span className="quadraseer-node quadraseer-node-hrm">Tech Stack</span>
              <span className="quadraseer-node quadraseer-node-phase">Data Model</span>
              <span className="quadraseer-node quadraseer-node-vault">Wireframes</span>
              <span className="quadraseer-node quadraseer-node-local">Investor Confidence</span>
            </div>
          </article>
        </section>

        <section className="section" id="systems">
          <div className="section-heading">
            <div>
              <span className="section-label">Emergent interface / new signal</span>
              <h2 className="section-title">The S.I.G.H.T. Zone.</h2>
            </div>
            <p className="section-note">A new portal is taking shape. Access coordinates will be established next.</p>
          </div>

          <div className="sight-zone-portal" aria-label="The S.I.G.H.T. Zone portal is awaiting access coordinates">
            <span className="sight-zone-orbit sight-zone-orbit-outer" aria-hidden="true" />
            <span className="sight-zone-orbit sight-zone-orbit-inner" aria-hidden="true" />
            <span className="sight-zone-axis sight-zone-axis-horizontal" aria-hidden="true" />
            <span className="sight-zone-axis sight-zone-axis-vertical" aria-hidden="true" />
            <div className="sight-zone-interface">
              <span>Nexus interface / S.I.G.H.T.</span>
              <strong>The S.I.G.H.T.<br />Zone</strong>
              <em>Coordinates pending</em>
            </div>
          </div>

          <a
            className="featured-experience"
            href="https://transcendentalprescience.com"
            rel="noreferrer"
            target="_blank"
          >
            <div className="featured-experience-image">
              <Image
                src="/axiom-and-ash.svg"
                alt="Axiom and Ash"
                fill
                sizes="(max-width: 1240px) 100vw, 1176px"
              />
            </div>
            <div className="featured-experience-copy">
              <span className="section-label">Axiom and Ash</span>
              <h3>Transcendental Prescience</h3>
              <p>Enter the signal beyond the known.</p>
              <span className="featured-experience-cta">Visit Transcendental Prescience</span>
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
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="section coming-soon" id="coming-soon">
          <div className="section-heading">
            <div>
              <span className="section-label">Systems in development</span>
              <h2 className="section-title">Coming soon.</h2>
            </div>
            <p className="section-note">Experiences and applications preparing for their next access window.</p>
          </div>

          <div className="experience-destinations" aria-label="Experiences coming soon">
            {upcomingExperiences.map((experience, index) => (
              <article className="experience-destination" key={experience.name}>
                <span>Experience / {String(index + 1).padStart(2, "0")}</span>
                <strong>{experience.name}</strong>
                <em className="experience-subtitle">{experience.subtitle}</em>
                <span className="experience-pending">Coming Soon</span>
              </article>
            ))}
          </div>

          <div className="crypto-app-grid" aria-label="HyperCross applications coming soon">
            {cryptoApps.map((app, index) => (
              <article className="crypto-app" key={app.name}>
                <span className="product-index">HyperCross / {String(index + 1).padStart(2, "0")}</span>
                <h3>{app.name}</h3>
                <p>{app.description}</p>
                <span className="crypto-app-pending">Coming Soon</span>
              </article>
            ))}
          </div>
        </section>

      </main>
      <footer className="site-footer">AZ Emergent Nexus / Cognitive systems for the next version of you</footer>
    </div>
  );
}

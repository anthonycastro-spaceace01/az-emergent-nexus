import { getCart } from "@/lib/cart-actions";
import { CartLineItem } from "./cart-line-item";
import Link from "next/link";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.lines.nodes.length === 0) {
    return (
      <div className="site-shell">
        <nav className="site-nav"><Link className="brand" href="/"><span className="brand-mark"><span>+</span></span><span className="brand-name">Nexus / 01</span></Link><Link className="cart-link" href="/cart">Cart / 00</Link></nav>
        <main className="cart-page"><span className="section-label">Cart / empty signal</span><h1 className="cart-title">Nothing queued.</h1><p className="cart-copy">Your next system is waiting.</p><Link className="primary-link" href="/">Return to systems</Link></main>
      </div>
    );
  }

  return (
    <div className="site-shell">
      <nav className="site-nav"><Link className="brand" href="/"><span className="brand-mark"><span>+</span></span><span className="brand-name">Nexus / 01</span></Link><Link className="cart-link" href="/cart">Cart / {String(cart.totalQuantity).padStart(2, "0")}</Link></nav>
      <main className="cart-page">
      <span className="section-label">Cart / review transmission</span>
      <h1 className="cart-title">Your systems.</h1>
      <div className="cart-table-wrap"><table className="cart-table">
        <thead>
          <tr>
            <th>Product</th><th>Price</th><th>Quantity</th><th>Total</th><th></th>
          </tr>
        </thead>
        <tbody>
          {cart.lines.nodes.map((line) => (
            <CartLineItem key={line.id} line={line} />
          ))}
        </tbody>
      </table></div>

      <div className="cart-summary">
        <p className="cart-subtotal">
          <strong>
            Subtotal: ${parseFloat(cart.cost.subtotalAmount.amount).toFixed(2)}{" "}
            {cart.cost.subtotalAmount.currencyCode}
          </strong>
        </p>
        <a
          className="primary-link"
          href={cart.checkoutUrl}
        >
          Proceed / Checkout
        </a>
      </div>

      <p className="cart-return">
        <Link href="/">Continue Shopping</Link>
      </p>
      </main>
    </div>
  );
}

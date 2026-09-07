"use client";

import { useTransition } from "react";
import { updateCartLine, removeFromCart } from "@/lib/cart-actions";
import type { CartLine } from "@/lib/shopify-types";

export function CartLineItem({ line }: { line: CartLine }) {
  const [isPending, startTransition] = useTransition();

  function handleUpdateQuantity(newQuantity: number) {
    startTransition(async () => {
      if (newQuantity <= 0) {
        await removeFromCart(line.id);
      } else {
        await updateCartLine(line.id, newQuantity);
      }
    });
  }

  function handleRemove() {
    startTransition(async () => {
      await removeFromCart(line.id);
    });
  }

  return (
    <tr className="cart-row" style={{ opacity: isPending ? 0.5 : 1 }}>
      <td className="cart-product">
        {line.merchandise.product.title}
        {line.merchandise.title !== "Default Title" && (
          <span className="cart-variant"> — {line.merchandise.title}</span>
        )}
      </td>
      <td className="cart-cell">
        ${parseFloat(line.merchandise.price.amount).toFixed(2)}
      </td>
      <td className="cart-cell">
        <div className="quantity-control">
        <button
          className="quantity-button"
          onClick={() => handleUpdateQuantity(line.quantity - 1)}
          disabled={isPending}
        >
          -
        </button>
        <span style={{ margin: "0 0.5rem" }}>{line.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(line.quantity + 1)}
          disabled={isPending}
        >
          +
        </button>
        </div>
      </td>
      <td className="cart-cell cart-total">
        ${parseFloat(line.cost.totalAmount.amount).toFixed(2)}
      </td>
      <td className="cart-cell">
        <button className="remove-button" onClick={handleRemove} disabled={isPending}>
          Remove
        </button>
      </td>
    </tr>
  );
}

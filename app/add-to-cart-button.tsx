"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { addToCart } from "@/lib/cart-actions";

export function AddToCartButton({
  variantId,
  availableForSale,
}: {
  variantId: string;
  availableForSale: boolean;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const cart = await addToCart(variantId);
      router.refresh();
      window.location.assign(cart.checkoutUrl);
    });
  }

  return (
    <button className="add-button" onClick={handleClick} disabled={!availableForSale || isPending}>
      {!availableForSale ? "Sold Out" : isPending ? "Opening checkout..." : "Buy access"}
    </button>
  );
}

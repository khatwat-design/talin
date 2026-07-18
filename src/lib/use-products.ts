"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/lib/products";

export type ProductsState = {
  products: Product[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

export const useProducts = (): ProductsState => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        setError("تعذر تحميل المنتجات حالياً.");
        setProducts([]);
        return;
      }
      const data = (await response.json()) as { products?: Product[] };
      setProducts(data.products ?? []);
    } catch {
      setError("تعذر تحميل المنتجات حالياً.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, loading, error, refresh: load };
};

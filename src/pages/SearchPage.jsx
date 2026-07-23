import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import EmptyState from "../components/EmptyState";
import { FiSearch } from "react-icons/fi";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").toLowerCase();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const results = products.filter((p) => {
    if (!query) return true;

    return (
      (p.name || "").toLowerCase().includes(query) ||
      (p.category || "").toLowerCase().includes(query) ||
      (p.shortDescription || "").toLowerCase().includes(query) ||
      (p.sku || "").toLowerCase().includes(query)
    );
  });

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        minHeight: "80vh",
        paddingBottom: "80px",
      }}
    >
      <Breadcrumb items={[{ label: "Search Results" }]} />

      <div className="container">
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "2.2rem",
              fontFamily: "var(--font-heading)",
            }}
          >
            Search Results for "{query}"
          </h1>

          {!loading && (
            <p style={{ color: "var(--color-text-muted)" }}>
              Found {results.length} matching designer garments
            </p>
          )}
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : results.length === 0 ? (
          <EmptyState
            icon={FiSearch}
            title="No Results Found"
            description={`We couldn't find any designer items matching "${query}". Try searching for sherwani, lehenga, saree, suit, or velvet.`}
            actionText="View All Products"
            actionLink="/shop"
          />
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
/**
 * Main application component for the Online Store.
 *
 * Amazon-inspired layout with dark header and product grid.
 * No filtering, searching, or sorting — those are left as a student assignment.
 */

import { useCallback, useEffect, useState } from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { fetchProducts } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import { ApiError } from "@/types/error";
import type { Product } from "@/types/product";
import "./index.css";

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    logger.info("app_loading_products", { operation: "load_all_products", component: "App" });

    try {
      setLoading(true);
      setError(null);
      const response = await fetchProducts();
      setProducts(response.products);
      logger.info("app_products_loaded", { products_count: response.total_count, component: "App" });
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.errorResponse.error_message
          : err instanceof Error
            ? err.message
            : "An unknown error occurred while loading products";
      setError(errorMessage);
      logger.error("app_load_products_failed", { error_message: errorMessage, component: "App" });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      {/* Amazon-style dark header */}
      <header className="bg-[#131921] text-white sticky top-0 z-20">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center h-[60px] gap-4">
            {/* Logo */}
            <div className="flex items-center gap-1 flex-shrink-0 cursor-pointer py-2 px-2 border border-transparent hover:border-white rounded">
              <svg className="w-6 h-6 text-[#FF9900]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <path d="M9 22V12h6v10" fill="#131921" />
              </svg>
              <span className="text-xl font-bold tracking-tight">
                Online<span className="text-[#FF9900]">Store</span>
              </span>
            </div>

            {/* Search bar (placeholder - not functional) */}
            <div className="flex-1 flex max-w-3xl">
              <div className="flex w-full rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 px-3 py-2 text-sm text-black focus:outline-none"
                  readOnly
                />
                <button type="button" className="bg-[#FEBD69] hover:bg-[#F3A847] px-4 flex items-center">
                  <svg className="w-5 h-5 text-[#131921]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Search">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Account & Cart */}
            <div className="hidden md:flex items-center gap-4 flex-shrink-0">
              <div className="py-1 px-2 border border-transparent hover:border-white rounded cursor-pointer">
                <div className="text-xs text-gray-300">Hello, sign in</div>
                <div className="text-sm font-bold leading-tight">Account & Lists</div>
              </div>
              <div className="py-1 px-2 border border-transparent hover:border-white rounded cursor-pointer">
                <div className="text-xs text-gray-300">Returns</div>
                <div className="text-sm font-bold leading-tight">& Orders</div>
              </div>
              <div className="py-1 px-2 border border-transparent hover:border-white rounded cursor-pointer flex items-end gap-1">
                <div className="relative">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-label="Cart">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  <span className="absolute -top-1 right-0 bg-[#FF9900] text-[#131921] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">0</span>
                </div>
                <span className="text-sm font-bold">Cart</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation bar */}
        <nav className="bg-[#232F3E]">
          <div className="max-w-[1500px] mx-auto px-4 flex items-center h-[39px] gap-1 overflow-x-auto">
            <span className="px-3 py-1 text-sm whitespace-nowrap rounded border border-transparent hover:border-white cursor-pointer">All</span>
            <span className="px-3 py-1 text-sm whitespace-nowrap rounded border border-transparent hover:border-white cursor-pointer">Today&apos;s Deals</span>
            <span className="px-3 py-1 text-sm whitespace-nowrap rounded border border-transparent hover:border-white cursor-pointer">Customer Service</span>
            <span className="px-3 py-1 text-sm whitespace-nowrap rounded border border-transparent hover:border-white cursor-pointer">Gift Cards</span>
            <span className="px-3 py-1 text-sm whitespace-nowrap rounded border border-transparent hover:border-white cursor-pointer">Sell</span>
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main className="max-w-[1500px] mx-auto px-4 py-4">
        {/* Results header */}
        {!loading && !error && (
          <div className="mb-4">
            <span className="text-sm text-gray-700">
              {`Showing all ${products.length} results`}
            </span>
          </div>
        )}

        {/* Error state */}
        {error ? (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white border border-red-300 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-label="Error">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold text-red-800">Error loading products</p>
                  <p className="text-sm text-red-600 mt-1">{error}</p>
                  <button type="button" onClick={loadProducts} className="mt-3 text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">
                    Try again
                  </button>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 border-t pt-3">
                <p>Make sure the backend server is running:</p>
                <code className="block mt-1 bg-gray-100 px-3 py-1.5 rounded text-xs font-mono">
                  cd online-store/backend && uv run python run_api.py
                </code>
              </div>
            </div>
          </div>
        ) : (
          <ProductGrid products={products} loading={loading} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-8">
        <div className="bg-[#37475A] text-white text-center py-3">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="text-sm hover:underline">
            Back to top
          </button>
        </div>
        <div className="bg-[#232F3E] text-white py-8">
          <div className="max-w-[1500px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h3 className="font-bold mb-2">Get to Know Us</h3>
              <ul className="space-y-1 text-gray-300">
                <li className="hover:underline cursor-pointer">About Us</li>
                <li className="hover:underline cursor-pointer">Careers</li>
                <li className="hover:underline cursor-pointer">Press Releases</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Make Money with Us</h3>
              <ul className="space-y-1 text-gray-300">
                <li className="hover:underline cursor-pointer">Sell products</li>
                <li className="hover:underline cursor-pointer">Become an Affiliate</li>
                <li className="hover:underline cursor-pointer">Advertise</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Payment Products</h3>
              <ul className="space-y-1 text-gray-300">
                <li className="hover:underline cursor-pointer">Shop with Points</li>
                <li className="hover:underline cursor-pointer">Reload Your Balance</li>
                <li className="hover:underline cursor-pointer">Gift Cards</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Let Us Help You</h3>
              <ul className="space-y-1 text-gray-300">
                <li className="hover:underline cursor-pointer">Your Account</li>
                <li className="hover:underline cursor-pointer">Your Orders</li>
                <li className="hover:underline cursor-pointer">Returns & Replacements</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-[#131921] text-gray-400 text-center py-4 text-xs">
          <p>Online Store - Student Assignment</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

/**
 * ProductCard component - Amazon-style product display card.
 */

import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/** Generate a deterministic pseudo-random rating for a product */
function getProductRating(id: number): { stars: number; count: number } {
  const stars = 3.5 + ((id * 7 + 3) % 15) / 10;
  const count = 50 + ((id * 31 + 17) % 950);
  return { stars: Math.round(stars * 10) / 10, count };
}

/** Render star rating SVGs */
function StarRating({ stars, count }: { stars: number; count: number }) {
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-[#DE7921]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {hasHalf && (
          <svg className="w-4 h-4 text-[#DE7921]" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${fullStars}`}>
                <stop offset="50%" stopColor="#DE7921" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${fullStars})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-[#007185] hover:text-[#C7511F] cursor-pointer">{count.toLocaleString()}</span>
    </div>
  );
}

/** Category icon/emoji mapping for product image placeholder */
const categoryEmoji: Record<string, string> = {
  electronics: "laptop",
  clothing: "shirt",
  home: "lamp",
  sports: "dumbbell",
  books: "book-open",
};

/** Category background colors for image placeholder */
const categoryBg: Record<string, string> = {
  electronics: "from-blue-50 to-blue-100",
  clothing: "from-purple-50 to-purple-100",
  home: "from-green-50 to-green-100",
  sports: "from-orange-50 to-orange-100",
  books: "from-yellow-50 to-yellow-100",
};

function ProductImage({ category }: { category: string }) {
  const iconMap: Record<string, JSX.Element> = {
    electronics: (
      <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    clothing: (
      <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 2l3 3h6l3-3M6 2v6a6 6 0 0012 0V2M6 2H4l-1 8h2M18 2h2l1 8h-2M3 22h18M5 10v12M19 10v12M9 14h6" />
      </svg>
    ),
    home: (
      <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    sports: (
      <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    books: (
      <svg className="w-16 h-16 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  };

  const bg = categoryBg[category] || "from-gray-50 to-gray-100";
  const icon = iconMap[category] || iconMap.electronics;

  return (
    <div className={`aspect-square bg-gradient-to-br ${bg} flex items-center justify-center rounded-t`}>
      {icon}
    </div>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const price = parseFloat(product.product_price_usd);
  const dollars = Math.floor(price);
  const cents = Math.round((price - dollars) * 100).toString().padStart(2, "0");
  const { stars, count } = getProductRating(product.product_id);

  const isPrime = product.product_id % 3 !== 0; // ~2/3 of products are "Prime"

  return (
    <div className="bg-white rounded border border-gray-200 flex flex-col hover:shadow-md transition-shadow group">
      {/* Product image placeholder */}
      <div className="relative overflow-hidden">
        <ProductImage category={product.product_category} />
        {!product.product_in_stock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product details */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Product name */}
        <h3 className="text-sm text-[#0F1111] leading-tight line-clamp-2 group-hover:text-[#C7511F] cursor-pointer">
          {product.product_name}
        </h3>

        {/* Rating */}
        <div className="mt-1">
          <StarRating stars={stars} count={count} />
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-xs align-top">$</span>
          <span className="text-[22px] font-light leading-none">{dollars}</span>
          <span className="text-xs align-top">{cents}</span>
        </div>

        {/* Prime badge */}
        {isPrime && (
          <div className="mt-1 flex items-center gap-1">
            <svg className="w-12 h-4" viewBox="0 0 60 20" aria-label="Prime">
              <rect width="60" height="20" rx="3" fill="#232F3E" />
              <text x="6" y="14" fill="#FF9900" fontSize="11" fontWeight="bold" fontFamily="Arial">prime</text>
            </svg>
            <span className="text-xs text-gray-500">FREE Delivery</span>
          </div>
        )}

        {/* Category tag */}
        <div className="mt-auto pt-2">
          <span className="text-xs text-gray-500 capitalize">{product.product_category}</span>
        </div>
      </div>
    </div>
  );
}

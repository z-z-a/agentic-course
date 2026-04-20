/**
 * Product types matching backend Pydantic models EXACTLY.
 *
 * Backend definitions (app/models/product.py):
 * - ProductCategory = Literal["electronics", "clothing", "home", "sports", "books"]
 * - Product model with strict field types
 * - ProductListResponse wrapper
 *
 * IMPORTANT: These types must stay in sync with backend models.
 */

/**
 * Product category enum matching backend Literal type.
 *
 * Backend: ProductCategory = Literal["electronics", "clothing", "home", "sports", "books"]
 */
export type ProductCategory = "electronics" | "clothing" | "home" | "sports" | "books";

/**
 * Product model matching backend Pydantic Product model.
 *
 * Note: Decimal from backend is serialized as string in JSON
 */
export interface Product {
  /** Unique product identifier (always positive integer) */
  product_id: number;

  /** Display name of the product (1-200 characters) */
  product_name: string;

  /** Detailed product description (1-1000 characters) */
  product_description: string;

  /** Price in USD as string (Decimal serialized from backend with 2 decimal places) */
  product_price_usd: string;

  /** Product category (one of 5 valid categories) */
  product_category: ProductCategory;

  /** Whether product is currently available for purchase */
  product_in_stock: boolean;
}

/**
 * Product list response matching backend ProductListResponse model.
 */
export interface ProductListResponse {
  /** Array of product objects */
  products: Product[];

  /** Total number of products in response (always >= 0) */
  total_count: number;
}

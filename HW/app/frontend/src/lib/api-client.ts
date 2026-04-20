/**
 * Type-safe API client for communicating with FastAPI backend.
 *
 * Backend endpoints:
 * - GET /api/products - Get all products (no filters)
 * - GET /health - Health check
 *
 * Error handling:
 * - Network errors: Throws standard Error
 * - API errors: Throws ApiError with ErrorResponse
 */

import { ApiError, type ErrorResponse } from "@/types/error";
import type { ProductListResponse } from "@/types/product";
import { logger } from "./logger";

/**
 * Backend API base URL.
 * Default: http://localhost:8000 (matching backend run_api.py port)
 */
const API_BASE_URL = "http://localhost:8000";

/**
 * Fetch all products from the store API.
 *
 * No filtering, searching, or sorting — returns all products.
 *
 * @returns ProductListResponse with all products and total count
 * @throws ApiError if backend returns error response (4xx/5xx)
 * @throws Error if network failure or unable to reach backend
 */
export async function fetchProducts(): Promise<ProductListResponse> {
  const endpoint = "/api/products";
  const url = `${API_BASE_URL}${endpoint}`;

  logger.info("fetching_products", {
    endpoint,
    url,
    operation: "fetchProducts",
  });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle non-OK responses (4xx, 5xx)
    if (!response.ok) {
      let errorData: ErrorResponse;

      try {
        errorData = await response.json();
      } catch {
        errorData = {
          error_code: "unknown_error",
          error_message: `HTTP ${response.status}: ${response.statusText}`,
          timestamp_utc: new Date().toISOString(),
        };
      }

      logger.error("fetch_products_failed", {
        endpoint,
        status_code: response.status,
        error_code: errorData.error_code,
        error_message: errorData.error_message,
        operation: "fetchProducts",
      });

      throw new ApiError(response.status, errorData);
    }

    const data: ProductListResponse = await response.json();

    logger.info("products_fetched_successfully", {
      endpoint,
      products_count: data.total_count,
      operation: "fetchProducts",
    });

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    const errorMessage = error instanceof Error ? error.message : String(error);

    logger.error("network_error", {
      endpoint,
      error_message: errorMessage,
      error_type: "network_failure",
      fix_suggestion: `Check that backend server is running at ${API_BASE_URL}`,
      operation: "fetchProducts",
    });

    throw new Error(`Network error while fetching products: ${errorMessage}`);
  }
}

/**
 * Health check for the backend API.
 *
 * @returns true if backend is healthy and reachable
 * @returns false if backend is down or unhealthy
 */
export async function checkHealth(): Promise<boolean> {
  const endpoint = "/health";
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    const isHealthy = data.status === "healthy";

    logger.info("health_check_completed", {
      endpoint,
      is_healthy: isHealthy,
      operation: "checkHealth",
    });

    return isHealthy;
  } catch (error) {
    logger.warning("health_check_failed", {
      endpoint,
      error_message: error instanceof Error ? error.message : String(error),
      operation: "checkHealth",
    });

    return false;
  }
}

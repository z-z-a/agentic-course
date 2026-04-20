/**
 * Error types matching backend Pydantic ErrorResponse model EXACTLY.
 *
 * Backend definition (app/models/error.py):
 * ```python
 * class ErrorResponse(BaseModel):
 *     error_code: str
 *     error_message: str
 *     error_details: dict[str, Any] | None
 *     timestamp_utc: str
 * ```
 */

/**
 * Error response model matching backend ErrorResponse.
 */
export interface ErrorResponse {
  /** Machine-readable error code */
  error_code: string;

  /** Human-readable error message for end users */
  error_message: string;

  /** Optional additional context for debugging */
  error_details?: Record<string, unknown>;

  /** ISO 8601 timestamp when error occurred (UTC) */
  timestamp_utc: string;
}

/**
 * Custom error class for API errors with structured information.
 *
 * Wraps ErrorResponse from backend with HTTP status code.
 */
export class ApiError extends Error {
  constructor(
    /** HTTP status code (e.g., 400, 404, 500) */
    public readonly statusCode: number,
    /** Structured error response from backend */
    public readonly errorResponse: ErrorResponse
  ) {
    super(errorResponse.error_message);
    this.name = "ApiError";

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

"""Error response models for consistent API error handling."""

from datetime import UTC, datetime
from typing import Any

from pydantic import BaseModel, Field


class ErrorResponse(BaseModel):
    """
    Standard error response format for all API errors.

    Attributes:
        error_code: Machine-readable error identifier (e.g., 'product_not_found')
        error_message: Human-readable error message for end users
        error_details: Optional dictionary with additional debugging context
        timestamp_utc: ISO 8601 formatted timestamp when the error occurred
    """

    error_code: str = Field(
        ...,
        description="Machine-readable error code for programmatic handling",
        examples=["product_not_found", "validation_error"],
        min_length=1,
        max_length=100,
    )

    error_message: str = Field(
        ...,
        description="Human-readable error message suitable for displaying to end users",
        min_length=1,
        max_length=500,
    )

    error_details: dict[str, Any] | None = Field(
        default=None, description="Additional context about the error for debugging purposes"
    )

    timestamp_utc: str = Field(
        default_factory=lambda: datetime.now(UTC).isoformat(),
        description="ISO 8601 timestamp when the error occurred (UTC timezone)",
    )

"""
Product API endpoints.

This module defines the HTTP endpoint for retrieving products.
No filtering, searching, or sorting is implemented — those features
are left as a student assignment.
"""

from fastapi import APIRouter

from app.core.logging import StructuredLogger
from app.models.product import ProductListResponse
from app.services import product_service

# Initialize router for product endpoints
router = APIRouter(prefix="/api/products", tags=["products"])

# Initialize structured logger
logger = StructuredLogger(__name__)


@router.get("", response_model=ProductListResponse)
async def get_products() -> ProductListResponse:
    """
    Get all products from the store.

    Returns all products without any filtering or sorting.
    Filtering, searching, and sorting are left as a student assignment.

    Returns:
        ProductListResponse containing all products and total count
    """
    logger.info(
        "api_request_received",
        endpoint="/api/products",
        http_method="GET",
        operation="get_products",
    )

    products = product_service.get_all_products()

    logger.info(
        "api_response_prepared", endpoint="/api/products", products_count=len(products), operation="get_products"
    )

    return ProductListResponse(products=products, total_count=len(products))

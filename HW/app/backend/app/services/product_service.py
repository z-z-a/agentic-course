"""
Product service containing business logic for product operations.

This service layer separates business logic from API routing logic,
making the code more testable and maintainable.
"""

from app.core.logging import StructuredLogger
from app.data.seed_products import get_seed_products
from app.models.product import Product

# Initialize structured logger for this module
logger = StructuredLogger(__name__)

# In-memory product storage (in a real app, this would be a database)
_PRODUCTS_DATABASE: list[Product] = get_seed_products()


def get_all_products() -> list[Product]:
    """
    Retrieve all products from the store.

    Returns all available products without any filtering.

    Returns:
        List of all Product objects in the store
    """
    logger.info(
        "retrieving_all_products", total_products_in_database=len(_PRODUCTS_DATABASE), operation="get_all_products"
    )

    logger.info(
        "products_retrieved_successfully", products_returned=len(_PRODUCTS_DATABASE), operation="get_all_products"
    )

    return _PRODUCTS_DATABASE

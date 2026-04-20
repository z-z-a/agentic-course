"""Product data models for the online store API."""

from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, Field

# Define valid product categories as a type alias for reusability
ProductCategory = Literal["electronics", "clothing", "home", "sports", "books"]


class Product(BaseModel):
    """
    Represents a single product in the online store.

    Attributes:
        product_id: Unique identifier for the product
        product_name: Display name of the product
        product_description: Detailed description of the product
        product_price_usd: Price in US dollars (uses Decimal for precision)
        product_category: One of the predefined product categories
        product_in_stock: Whether the product is currently available
    """

    product_id: int = Field(..., description="Unique product identifier", gt=0, examples=[1, 42, 1337])

    product_name: str = Field(
        ...,
        description="Display name of the product",
        min_length=1,
        max_length=200,
        examples=["Wireless Mouse", "Cotton T-Shirt", "Coffee Maker"],
    )

    product_description: str = Field(
        ...,
        description="Detailed description of the product features and specifications",
        min_length=1,
        max_length=1000,
        examples=["Ergonomic wireless mouse with USB receiver and long battery life"],
    )

    product_price_usd: Decimal = Field(
        ...,
        description="Product price in US dollars (uses Decimal for monetary precision)",
        gt=0,
        decimal_places=2,
        examples=["29.99", "199.99", "9.99"],
    )

    product_category: ProductCategory = Field(
        ...,
        description="Product category, must be one of the predefined categories",
        examples=["electronics", "clothing", "home", "sports", "books"],
    )

    product_in_stock: bool = Field(default=True, description="Whether the product is currently available for purchase")


class ProductListResponse(BaseModel):
    """
    Response model for endpoints that return a list of products.

    Attributes:
        products: List of product objects
        total_count: Number of products in the response
    """

    products: list[Product] = Field(..., description="List of products matching the request criteria")

    total_count: int = Field(..., description="Total number of products in this response", ge=0)

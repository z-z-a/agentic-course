"""
Tests for the products API.

These tests verify the GET /api/products endpoint and the health check.
"""

from fastapi.testclient import TestClient


def test_get_all_products_returns_200(test_client: TestClient) -> None:
    """Test that GET /api/products returns HTTP 200 status code."""
    response = test_client.get("/api/products")

    assert response.status_code == 200


def test_get_all_products_returns_correct_structure(test_client: TestClient) -> None:
    """Test that GET /api/products returns the expected JSON structure."""
    response = test_client.get("/api/products")
    data = response.json()

    assert "products" in data
    assert "total_count" in data
    assert isinstance(data["products"], list)
    assert isinstance(data["total_count"], int)


def test_get_all_products_returns_30_products(test_client: TestClient) -> None:
    """Test that GET /api/products returns all 30 seed products."""
    response = test_client.get("/api/products")
    data = response.json()

    assert data["total_count"] == 30
    assert len(data["products"]) == 30


def test_product_objects_have_required_fields(test_client: TestClient) -> None:
    """Test that each product object contains all required fields."""
    response = test_client.get("/api/products")
    data = response.json()

    products = data["products"]
    assert len(products) > 0

    first_product = products[0]
    required_fields = [
        "product_id",
        "product_name",
        "product_description",
        "product_price_usd",
        "product_category",
        "product_in_stock"
    ]

    for field in required_fields:
        assert field in first_product


def test_health_check_endpoint(test_client: TestClient) -> None:
    """Test that the /health endpoint works correctly."""
    response = test_client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

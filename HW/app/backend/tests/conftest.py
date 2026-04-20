"""
Pytest configuration and shared test fixtures.

This module provides reusable test fixtures for all test files.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def test_client() -> TestClient:
    """
    Provide a FastAPI TestClient for making HTTP requests in tests.

    Returns:
        TestClient instance configured with the FastAPI app
    """
    return TestClient(app)

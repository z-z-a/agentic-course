"""
Structured JSON logging configuration for AI-debuggable output.

This module configures logging to output structured JSON to stdout, making it
easy for AI coding assistants to read and understand errors, debugging context,
and application behavior.
"""

import json
import logging
import sys
from datetime import UTC, datetime
from typing import Any


class JsonFormatter(logging.Formatter):
    """
    Formats log records as JSON objects for structured logging.

    Each log record is converted to a JSON object with:
    - timestamp: ISO 8601 formatted UTC timestamp
    - level: Log level (INFO, ERROR, WARNING, etc.)
    - logger_name: Name of the logger that generated the record
    - message: The log message
    - **extra_fields: Any additional context passed via extra={}
    """

    def format(self, record: logging.LogRecord) -> str:
        log_data: dict[str, Any] = {
            "timestamp": datetime.now(UTC).isoformat(),
            "level": record.levelname,
            "logger_name": record.name,
            "message": record.getMessage(),
        }

        if hasattr(record, "extra_fields"):
            log_data.update(record.extra_fields)  # type: ignore[attr-defined]

        if record.exc_info:
            log_data["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_data, default=str)


def setup_logging(log_level: str = "INFO") -> None:
    """Configure application-wide structured JSON logging to stdout."""
    json_formatter = JsonFormatter()

    stdout_handler = logging.StreamHandler(sys.stdout)
    stdout_handler.setFormatter(json_formatter)

    root_logger = logging.getLogger()
    root_logger.setLevel(getattr(logging, log_level.upper()))
    root_logger.addHandler(stdout_handler)
    root_logger.propagate = False


class StructuredLogger:
    """
    Logger wrapper that makes structured logging more ergonomic.

    Instead of passing extra={} every time, this wrapper lets you pass
    fields directly as keyword arguments.
    """

    def __init__(self, logger_name: str):
        self._logger = logging.getLogger(logger_name)

    def _log(self, level: int, message: str, **fields: Any) -> None:
        record = self._logger.makeRecord(
            self._logger.name,
            level,
            "",
            0,
            message,
            (),
            None,
        )
        record.extra_fields = fields
        self._logger.handle(record)

    def debug(self, message: str, **fields: Any) -> None:
        self._log(logging.DEBUG, message, **fields)

    def info(self, message: str, **fields: Any) -> None:
        self._log(logging.INFO, message, **fields)

    def warning(self, message: str, **fields: Any) -> None:
        self._log(logging.WARNING, message, **fields)

    def error(self, message: str, **fields: Any) -> None:
        self._log(logging.ERROR, message, **fields)

    def critical(self, message: str, **fields: Any) -> None:
        self._log(logging.CRITICAL, message, **fields)

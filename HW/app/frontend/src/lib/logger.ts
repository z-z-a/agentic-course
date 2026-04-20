/**
 * Structured logging utility matching backend logging patterns.
 *
 * This mirrors the backend's StructuredLogger (app/core/logging.py).
 * Logs are output as JSON to console for AI readability and debugging.
 */

/** Log data structure for additional context fields */
interface LogData {
  [key: string]: unknown;
}

/**
 * StructuredLogger class for consistent JSON logging.
 */
class StructuredLogger {
  private formatLog(level: string, message: string, data?: LogData): string {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      logger_name: "frontend",
      message,
      ...data,
    });
  }

  info(message: string, data?: LogData): void {
    console.log(this.formatLog("INFO", message, data));
  }

  error(message: string, data?: LogData): void {
    console.error(this.formatLog("ERROR", message, data));
  }

  warning(message: string, data?: LogData): void {
    console.warn(this.formatLog("WARNING", message, data));
  }

  debug(message: string, data?: LogData): void {
    console.debug(this.formatLog("DEBUG", message, data));
  }
}

/** Singleton logger instance for use throughout the application */
export const logger = new StructuredLogger();

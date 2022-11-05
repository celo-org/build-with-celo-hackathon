class Logger {
  isLogInfoEnabled = true;
  isLogWarningEnabled = true;
  isLogErrorEnabled = true;

  constructor() {
    this.isLogInfoEnabled = true;
    this.isLogWarningEnabled = true;
    this.isLogErrorEnabled = true;
  }

  logInfo(source: string, message: string, extra?: unknown) {
    if (this.isLogInfoEnabled) {
      this.log('INFO', source, message, extra);
    }
  }

  logWarning(source: string, message: string, extra?: unknown) {
    if (this.isLogWarningEnabled) {
      this.log('WARNING', source, message, extra);
    }
  }

  logError(source: string, message: string, extra?: unknown) {
    if (this.isLogErrorEnabled) {
      this.log('ERROR', source, message, extra);
    }
  }

  private log(level: string, source: string, message: string, extra: unknown) {
    if (extra) {
      console.log(`[${level}][${source}] ${message}`, extra);
    } else {
      console.log(`[${level}][${source}] ${message}`);
    }
  }
}

export default new Logger();

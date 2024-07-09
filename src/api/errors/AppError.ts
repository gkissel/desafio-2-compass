class AppError {
    public readonly code: number;
    public readonly status: string;
    public readonly message: string;
  
    constructor(status: string, message: string, statusCode = 400) {
      this.code = statusCode;
      this.status = status;
      this.message = message;
    }
  }
  
  export default AppError;
  
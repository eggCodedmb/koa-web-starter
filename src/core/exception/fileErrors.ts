export class FileUploadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

export class FileLimitExceededError extends FileUploadError {
  constructor(message: string) {
    super(`文件限制错误：${message}`)
  }
}

export class InvalidFileTypeError extends FileUploadError {
  constructor(message: string) {
    super(`无效文件类型：${message}`)
  }
}

import {
  CreateSuccess,
  DeleteSuccess,
  ForbiddenException,
  GetSuccess,
  NotFoundException,
  ParameterException,
  ServerErrorException,
  UnAuthenticatedException,
  UpdateSuccess,
} from './http-exception'

/**
 * Unify Response
 */
export class UnifyResponse {
  /**
   * 获取成功
   * @param code errorCode
   * @param message errorCode message
   */
  getSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new GetSuccess(code, message)
  }

  /**
   * 创建成功
   * @param code errorCode
   * @param message errorCode message
   */
  createSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new CreateSuccess(code, message)
  }

  /**
   * 更新成功
   * @param code errorCode
   * @param message errorCode message
   */
  updateSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new UpdateSuccess(code, message)
  }

  /**
   * 删除成功
   * @param code errorCode
   * @param message errorCode message
   */
  deleteSuccess({ code = global.SUCCESS_CODE, message = '' }) {
    throw new DeleteSuccess(code, message)
  }

  /**
   * 参数错误
   * @param codeOrMessage errorCode | error message
   */
  parameterException(codeOrMessage: number | string) {
    throw new ParameterException(codeOrMessage)
  }

  /**
   * 认证失败
   * @param code errorCode
   */
  unAuthenticatedException(code: number) {
    throw new UnAuthenticatedException(code)
  }

  /**
   * 权限不足
   * @param code errorCode
   */
  forbiddenException(code: number) {
    throw new ForbiddenException(code)
  }

  /**
   * 资源不存在
   * @param code errorCode
   */
  notFoundException(code: number) {
    throw new NotFoundException(code)
  }

  /**
   * 服务器错误
   * @param codeOrMessage errorCode | error message
   */
  serverErrorException(codeOrMessage: number | string) {
    throw new ServerErrorException(codeOrMessage)
  }
}

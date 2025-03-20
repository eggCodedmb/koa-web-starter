import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import CONFIG from '~/config'
const BASE_API = CONFIG.SDSERVER.HOST

class HttpClient {
  private service: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config)

    // 请求拦截
    this.service.interceptors.request.use(this.handleRequestSuccess, this.handleRequestError)

    // 响应拦截
    this.service.interceptors.response.use(this.handleResponseSuccess, this.handleResponseError)
  }

  // 请求成功处理
  private handleRequestSuccess = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    // 自动处理不同Content-Type
    if (config.headers['Content-Type'] === 'form') {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      config.transformRequest = [(data) => this.stringifyFormData(data)]
    } else if (config.headers['Content-Type'] === 'form-data') {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers['Content-Type'] = 'application/json'
    }

    // 请求计时开始
    ;(config as any).metadata = { startTime: new Date() }
    return config
  }

  // 请求错误处理
  private handleRequestError = (error: any): Promise<any> => {
    return Promise.reject(error)
  }

  // 响应成功处理
  private handleResponseSuccess = (response: AxiosResponse): any => {
    // 请求计时结束
    const endTime = new Date()
    const duration = endTime.getTime() - (response.config as any).metadata.startTime.getTime()

    log.config({
      title: `请求 ${response.config.url} 耗时 ${duration}ms`,
    })

    // 处理二进制数据
    if (response.config.responseType === 'blob') {
      return response.data
    }

    // 根据业务状态码处理
    const { code, data, message } = response.data

    if (code === 200) {
      return data
    } else {
      this.handleBusinessError(code, message)
      return Promise.reject(new Error(message || 'Error'))
    }
  }

  // 响应错误处理
  private handleResponseError = (error: any): Promise<any> => {
    return Promise.reject(error)
  }

  // 处理业务错误
  private handleBusinessError(code: any, message: string): void {
    console.error(`业务错误 ${code}: ${message}`)
  }

  // 通用请求方法
  public request(config: AxiosRequestConfig): Promise<any> {
    return this.service.request(config)
  }

  // GET请求
  public get(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.service.get(url, { params, ...config })
  }

  // POST请求
  public post(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.service.post(url, data, config)
  }

  // PUT请求
  public put(url: string, data = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.service.put(url, data, config)
  }

  // DELETE请求
  public delete(url: string, params = {}, config: AxiosRequestConfig = {}): Promise<any> {
    return this.service.delete(url, { params, ...config })
  }

  // 辅助方法：将对象转换为 x-www-form-urlencoded 格式
  private stringifyFormData(data: any): string {
    return Object.keys(data)
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
      .join('&')
  }
}

// 日志配置的辅助函数
const log = {
  config: (info: { title: string }) => {
    // console.log(info.title)
  },
}

// 创建实例
const service = new HttpClient({
  baseURL: BASE_API,
  timeout: 15000,
  withCredentials: true, // 跨域请求时是否需要使用凭证
  transformRequest: [
    (data, headers) => {
      // 自动转换请求数据
      if (headers['Content-Type'] === 'application/json') {
        return JSON.stringify(data)
      }
      return data
    },
  ],
  transformResponse: [
    (data) => {
      try {
        return JSON.parse(data)
      } catch (e) {
        return data
      }
    },
  ],
})

export default service

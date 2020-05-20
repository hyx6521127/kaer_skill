/*
 * @Author: huyixing
 * @Date: 2018-09-04 16:51:18
 * @Last Modified by: huyixing
 * @Last Modified time: 2019-10-16 15:11:29
 */
import axios, {
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig
  } from 'axios'
  import { message } from 'antd'
  
  enum ECode {
    SYSTEM_CODE = 1, // 操作成功
    OPERATION_SUCCESS = 10000, // "操作成功"
    GAIN_SUCCESS = 10001, // "成功获取数据，数据非空"
    GAIN_SUCCESS_EMPTY = 10002, // "操作成功,数据为空"
    OPERATION_FAIL = 20000, // "操作失败"
    PARM_ERRO = 20001, // "参数错误"
    EXCEPTION_FAIL = 20002, // "异常报错"
    SOCKET_CON_FAIL = 20003, // "Sockt 连接失败"
    UNAUTH_ERRO = 20004, // "未登录"
    FORBB_ERRO = 20005, // "无权限"
    NOT_ACCEPTABLE = 20006, // "未签名"
    DISABLE_ACCOUNT = 20007, // "账号被冻结"
    USER_PASSWORD_ERRO = 20008 // "账号密码错误"
  }
  
  export interface IApiData {
    data: any
    code: ECode
    msg: string
  }
  
  interface IData extends AxiosResponse {
    data: IApiData
  }
  
  const requestInterceptor = (config: AxiosRequestConfig) => {
    //  添加请求头在这里
    return config
  }
  
  const requestInterceptorError = (err: AxiosError) => err
  const responseInterceptor = (response: AxiosResponse) => response
  const responseInterceptorError = (err: AxiosError) => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          // 401 没有token
          console.log(err.response)
          message.error(err.response.data.msg || '参数错误')
          break
        case 401:
          // 401 没有token
          localStorage.removeItem('token')
          location.hash = '/login'
          message.error(err.response.data.msg || '权限错误')
          break
        case 500:
          // 500 接口异常
          message.error(err.response.data.msg || '异常')
          break
        default:
          break
      }
      return Promise.reject(err)
    }
    return Promise.reject(err)
  }
  class Http {
    private static instance: Http
    private session: AxiosInstance
  
    private constructor() {
      const options = {
        //  更换baseurl
        baseURL: '/api',
        // timeout: 6000
      }
      this.session = axios.create(options)
      this.session.interceptors.request.use(
        requestInterceptor,
        requestInterceptorError
      )
      this.session.interceptors.response.use(
        responseInterceptor,
        responseInterceptorError
      )
    }
    static getInstance() {
      if (!Http.instance) {
        Http.instance = new Http()
      }
      return Http.instance
    }
    public checkResponse(response: IData): Promise<IApiData> {
      return new Promise((resolve, reject) => {
        const { data } = response
        const { code, msg } = data
        if (
          code !== ECode.OPERATION_SUCCESS &&
          code !== ECode.GAIN_SUCCESS &&
          code !== ECode.GAIN_SUCCESS_EMPTY &&
          code !== ECode.SYSTEM_CODE
        ) {
          /// TODO: 后面改成自定义提示控件
          message.warning(msg)
          return reject({ code, msg })
        }
        return resolve(data)
      })
    }
    /**
     * get方法
     * @param url api接口
     */
  
    get(api: string, params?: AxiosRequestConfig) {
      return this.session(
        Object.assign({ method: 'get', url: api }, params)
      ).then((response: IData) => {
        return this.checkResponse(response)
      })
    }
  
    /**
     * post方法
     * @param url api接口
     * @param param 参数
     */
    post(api: string, params?: AxiosRequestConfig) {
      return this.session(
        Object.assign({ method: 'post', url: api }, params)
      ).then((response: IData) => {
        return this.checkResponse(response)
      })
    }
  
    /**
     * delete方法
     * @param url  api接口
     */
    delete(api: string, params?: AxiosRequestConfig) {
      return this.session(
        Object.assign({ method: 'delete', url: api }, params)
      ).then((response: IData) => {
        return this.checkResponse(response)
      })
    }
  
    /**
     * put方法
     * @param url  api接口
     * @param param 参数
     */
    put(api: string, params?: AxiosRequestConfig) {
      return this.session(
        Object.assign({ method: 'put', url: api }, params)
      ).then((response: IData) => {
        return this.checkResponse(response)
      })
    }
  }
  
  export default Http
  
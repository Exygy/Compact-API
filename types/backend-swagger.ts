/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, {
  type AxiosInstance,
  type AxiosRequestConfig,
} from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /**
   * show loading status
   */
  loading?: boolean;
  /**
   * display error message
   */
  showError?: boolean;
  /**
   * data security, extended fields are encrypted using the specified algorithm
   */
  security?: Record<string, 'md5' | 'sha1' | 'aes' | 'des'>;
  /**
   * indicates whether Authorization credentials are required for the request
   * @default true
   */
  withAuthorization?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(
  configs: IRequestConfig,
  resolve: (p: any) => void,
  reject: (p: any) => void,
): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(
  method: string,
  contentType: string,
  url: string,
  options: any,
): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url,
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType,
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResult<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResult<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class RootService {
  /**
   * Health check endpoint
   */
  healthCheck(options: IRequestOptions = {}): Promise<SuccessDTO> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/';

      const configs: IRequestConfig = getConfigs(
        'get',
        'application/json',
        url,
        options,
      );

      axios(configs, resolve, reject);
    });
  }
  /**
   * Tip me over and pour me out
   */
  teapot(options: IRequestOptions = {}): Promise<SuccessDTO> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/teapot';

      const configs: IRequestConfig = getConfigs(
        'get',
        'application/json',
        url,
        options,
      );

      axios(configs, resolve, reject);
    });
  }
}

export class ScriptRunnerService {
  /**
   * An example of how the script runner can work
   */
  exampleScript(
    params: {
      /** requestBody */
      body?: NameDTO;
    } = {} as any,
    options: IRequestOptions = {},
  ): Promise<SuccessDTO> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/scriptRunner/exampleScript';

      const configs: IRequestConfig = getConfigs(
        'put',
        'application/json',
        url,
        options,
      );

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export interface SuccessDTO {
  /**  */
  success: boolean;
}

export interface NameDTO {
  /**  */
  name: string;
}

import { push } from 'react-router-redux'
import * as Cookies from 'js-cookie'
import AppSettings from '../appSettings'
import { IFetchResult } from 'models/index'

class HttpUtils {
    parseJSON<T> (response: Response): Promise<IFetchResult<T>> {
        return new Promise((resolve) => {
            if (response.status === 401) {
                const location = window.location
                push(`/account/logout?returnUrl=${encodeURIComponent(location.pathname + location.search)}&logout=true`)
                return
            } else if (response.status === 403) {
                push('/')
                throw { message: 'Access Denied', status: response.status, response }
            }

            response.text()
                .then((text) => {
                    if (text.length > 0) {
                        resolve({
                            status: response.status,
                            ok: response.ok,
                            data: JSON.parse(text) as T
                        })
                    } else {
                        resolve({
                            status: response.status,
                            ok: response.ok,
                            data: null
                        })
                    }

                })
        })
    }

    get<T> (url: string): Promise<IFetchResult<T>> {
        return this.futchGet(url)
    }

    post<T, R> (url: string, postData: T): Promise<IFetchResult<R>> {
        return this.futch<T, R>(url, 'POST', postData)
    }

    put<T, R> (url: string, postData: T): Promise<IFetchResult<R>> {
        return this.futch<T, R>(url, 'PUT', postData)
    }

    delete<T, R> (url: string, postData: T): Promise<IFetchResult<R>> {
        return this.futch<T, R>(url, 'DELETE', postData)
    }

    postXhr = (url: string, opts: any, onProgress: any, onComplete: any) => {
        return new Promise((res, rej) => {
            let xhr = new XMLHttpRequest()
            xhr.open(opts.method || 'get', url)
            for (let k in opts.headers || {}) {
                xhr.setRequestHeader(k, opts.headers[k])
            }
            xhr.onload = res
            xhr.onerror = rej
            xhr.onreadystatechange = onComplete
            xhr.setRequestHeader('X-CSRF-TOKEN-ARRAGROCMS', this.getCSRFCookie())
            if (xhr.upload && onProgress) {
                xhr.upload.onprogress = onProgress // event.loaded / event.total * 100  //event.lengthComputable
            }
            xhr.send(opts.body)
        })
    }

    private getCSRFCookie (): string {
        const csrf = Cookies.get('ARRAGROCMSCSRF')
        return csrf === undefined ? '' : csrf
    }

    private futchGet<T> (url: string): Promise<IFetchResult<T>> {
        return fetch(url, {
            credentials: 'same-origin'
        })
        .then((response: Response) => this.parseJSON<T>(response))
        .catch((error) => {
            if (url !== '/api/user/current') {
                AppSettings.error(`${error.message} - ${url}`, AppSettings.AlertSettings)
            }
            throw error
        })
    }

    private futch<T, R> (url: string, verb: string, postData: T): Promise<IFetchResult<R>> {
        return fetch(url, {
            credentials: 'same-origin',
            method: verb,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN-ARRAGROCMS': this.getCSRFCookie()
            },
            body: JSON.stringify(postData)
        })
        .then((response: Response) => this.parseJSON<R>(response))
        .catch((error) => {
            AppSettings.error(`${error.message} - ${url}`, AppSettings.AlertSettings)
            throw error
        })
    }
}

const httpUtils = new HttpUtils()

export default httpUtils

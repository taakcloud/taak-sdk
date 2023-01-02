import { Response as NodeResponse } from 'node-fetch'
import fetch from 'isomorphic-unfetch'

export type Config = {
  apiKey: string
  basePath?: string
}

export abstract class Base {
  private apiKey: string
  private basePath: string

  constructor(config: Config) {
    this.apiKey = config.apiKey
    this.basePath = config.basePath
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<NodeResponse> {
    const url = this.basePath + endpoint
    const headers = {
      'X-TAAK-API-KEY': this.apiKey,
      'Content-type': 'application/json'
    }
    const config = {
      ...options,
      headers,
    }
    return fetch(url, config)
  }

}
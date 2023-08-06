import axios, { AxiosInstance } from "axios";
import { buffers, END, eventChannel } from "redux-saga";

const PROD_BASE_URL = "";
const STAGE_BASE_URL = "https://sentrex-patient-api.azurewebsites.net/";
const STAGE_ADDITIONAL_URL = "http://52.228.120.78";

const USE_PROD = false;

export interface ApiRequestError {
  statusCode: number;
  data: any;
}

class ApiManager {
  private static instance: ApiManager;
  private axiosInstance: AxiosInstance;
  private defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  private authToken: string | null = null;

  constructor() {
    this.axiosInstance = axios.create();
    this.axiosInstance.defaults.baseURL = USE_PROD
      ? PROD_BASE_URL
      : STAGE_BASE_URL;
  }

  public static getInstance(): ApiManager {
    if (!this.instance) {
      this.instance = new ApiManager();
    }

    return this.instance;
  }

  public setToken(token: string) {
    this.authToken = token;
  }

  public get = (endpoint: string, params?: any, headers?: any) => {
    return this.axiosInstance
      .get(endpoint, {
        headers: {
          ...this.defaultHeaders,
          ...headers,
          ...(this.authToken
            ? { Authorization: `Bearer ${this.authToken}` }
            : {})
        },
        params
      })
      .catch((error) => {
        return Promise.reject<ApiRequestError>({
          statusCode: error.response.status,
          data: error.response.data
        });
      });
  };

  public post = (endpoint: string, data?: any, headers?: any) => {
    return this.axiosInstance
      .post(endpoint, data, {
        headers: {
          ...this.defaultHeaders,
          ...headers,
          ...(this.authToken
            ? { Authorization: `Bearer ${this.authToken}` }
            : {})
        }
      })
      .catch((error) => {
        return Promise.reject<ApiRequestError>({
          statusCode: error.response.status,
          data: error.response.data
        });
      });
  };

  public put = (endpoint: string, data: any, headers?: any) => {
    return this.axiosInstance
      .put(endpoint, data, {
        headers: {
          ...this.defaultHeaders,
          ...headers,
          ...(this.authToken
            ? { Authorization: `Bearer ${this.authToken}` }
            : {})
        }
      })
      .catch((error) => {
        return Promise.reject<ApiRequestError>({
          statusCode: error.response.status,
          data: error.response.data
        });
      });
  };

  public delete = (endpoint: string, params?: any) => {
    return this.axiosInstance
      .delete(endpoint, {
        headers: {
          ...this.defaultHeaders,
          ...(this.authToken
            ? { Authorization: `Bearer ${this.authToken}` }
            : {})
        },
        params
      })
      .catch((error) => {
        return Promise.reject<ApiRequestError>({
          statusCode: error.response.status,
          data: error.response.data
        });
      });
  };

  public createUploadFileChannel = (endpoint: string, formData: FormData) => {
    return eventChannel((emitter) => {
      const xhr = new XMLHttpRequest();
      const onProgress = (e: ProgressEvent) => {
        if (e.lengthComputable) {
          const progress = e.loaded / e.total;
          emitter({ progress });
        }
      };
      const onFailure = () => {
        emitter({ err: new Error("Upload failed") });
        emitter(END);
      };
      xhr.upload.addEventListener("progress", onProgress);
      xhr.upload.addEventListener("error", onFailure);
      xhr.upload.addEventListener("abort", onFailure);
      xhr.onreadystatechange = () => {
        const { readyState, status, responseText } = xhr;
        console.log("RESULT", readyState + " " + status + " " + responseText);

        if (readyState === 4) {
          if (status >= 200 && status < 300) {
            emitter({ success: true });
            emitter(END);
          } else {
            onFailure();
          }
        }
      };
      xhr.open(
        "POST",
        `${USE_PROD ? PROD_BASE_URL : STAGE_BASE_URL}${endpoint}`,
        true
      );
      xhr.setRequestHeader("Authorization", `Bearer ${this.authToken}`);
      xhr.setRequestHeader("Cache-Control", "no-cache");
      xhr.send(formData);
      return () => {
        xhr.upload.removeEventListener("progress", onProgress);
        xhr.upload.removeEventListener("error", onFailure);
        xhr.upload.removeEventListener("abort", onFailure);
        xhr.onreadystatechange = null;
        xhr.abort();
      };
    }, buffers.sliding(2));
  };

  public getAdditional = (endpoint: string, params?: any) => {
    return axios
      .get(`${STAGE_ADDITIONAL_URL}${endpoint}`, {
        headers: {
          ...this.defaultHeaders,
          PatientApiToken:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5NjNiYmVmMS1iZDIxLTQzMDMtYTUyZS03MjBhNmE0NjI3M2UiLCJuYW1lIjoiU2VudHJleFBhdGllbnRBcGkiLCJpYXQiOjE1MTYyMzkwMjJ9.fqSlTdrvFz8po7T5BqhOGlgEMBtag7odqm4ECyE3ixg"
        },
        params
      })
      .catch((error) => {
        return Promise.reject<ApiRequestError>({
          statusCode: error.response.status,
          data: error.response.data
        });
      });
  };
}

export default ApiManager;

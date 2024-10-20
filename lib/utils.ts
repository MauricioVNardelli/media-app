import { AxiosError } from "axios";
import { IResultActions } from "./definitions";

export function TreatError(error: any): IResultActions | undefined {
  if (error instanceof AxiosError) {
    //console.log("error", error.response?.data);

    const response = error.response?.data as {
      message: [{ message: string }] | string;
    };

    if (Array.isArray(response.message))
      return {
        error: {
          message: response.message[0].message,
        },
      };

    return {
      error: { message: response.message },
    };
  }
}

export function getDifferencesData(prData: any, prNewData: any) {
  return Object.keys(prData).reduce((diff: any, key) => {
    if (prData[key] !== prNewData[key]) {
      diff[key] = prNewData[key];
    }
    return diff;
  }, {});
}

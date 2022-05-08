import { getToken } from "../services/authsvc";

const DEFAULTERROR =
  "Something went wrong fetching data over network. Please try again later.";

export async function fetchFn(url, params) {
  try {
    params = params ?? {};
    params.headers = params.headers ?? {};

    const token = await getToken();
    params.headers = Object.assign(params.headers, { Authorization: token });

    console.log(`fetching from url - ${url}`)
    const res = await fetch(url, params);
    if (res.status == 401) {
      window.location.href = "/login";
    } else if (!res.ok) {
      const message = await res.text();
      const error = message && message.trim() !== "" ? message : DEFAULTERROR;
      return Promise.reject(Error(error));
    }
    return res;
  } catch (err) {
    if (err == "nouser") {
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
}

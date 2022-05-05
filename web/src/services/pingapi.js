import { fetchFn as http } from "./api";

export async function pingApi() {
  const params = {
    method: "GET",
  };
  return await http("/api/ping", params);
}

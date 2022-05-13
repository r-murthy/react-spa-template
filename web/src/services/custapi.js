import { fetchFn as http } from "./api";

const apiPath = "http://localhost:8002"

export async function getCustomers(nameFilter, pageToken) {
  const res = await http(
    `${apiPath}/api/customers?${nameFilter ? "nameFilter=" + nameFilter : ""}${
      nameFilter && pageToken ? "&" : ""
    }${pageToken ? "page=" + pageToken : ""}`
  );
  return await res.json();
}

export async function getCustomer(id) {
  const res = await http(`${apiPath}/api/customers/${id}`);
  return await res.json();
}

export async function upsertCustomer(customerid, name, email, phone) {
  const data = {
    customerid,
    name,
    email,
    phone,
  };

  const params = {
    method: "PUT",
    body: JSON.stringify(data),
  };

  const res = await http(`${apiPath}/api/customer`, params);
  return await res.json();
}

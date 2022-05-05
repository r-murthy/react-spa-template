import { fetchFn as http } from "./api";

export async function getCustomers(nameFilter, pageToken) {
  const res = await http(
    `/api/customers?${nameFilter ? "nameFilter=" + nameFilter : ""}${
      nameFilter && pageToken ? "&" : ""
    }${pageToken ? "page=" + pageToken : ""}`
  );
  return await res.json();
}

export async function getCustomer(id) {
  const res = await http("/api/customers/" + id);
  return await res.json();
}

export async function upsertCustomer(customerid, name, email, phone, gstin) {
  const data = {
    customerid,
    name,
    email,
    phone,
    gstin,
  };

  const params = {
    method: "PUT",
    body: JSON.stringify(data),
  };

  const res = await http("/api/customers", params);
  return await res.json();
}

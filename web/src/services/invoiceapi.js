import { fetchFn as http } from "./api";

export async function getInvoices(filter, pageToken) {
  const res = await http(
    `/api/invoices?${filter ? "filter=" + filter : ""}${
      filter && pageToken ? "&" : ""
    }${pageToken ? "page=" + pageToken : ""}`
  );
  return await res.json();
}

export async function getInvoice(id) {
  const res = await http("/api/invoices/" + id);
  return await res.json();
}

export async function upsertInvoice(invoiceid, date, customerid, items) {
  const data = {
    invoiceid,
    customerid,
    date,
    items,
  };

  const params = {
    method: "PUT",
    body: JSON.stringify(data),
  };

  const res = await http("/api/invoices", params);
  return await res.json();
}

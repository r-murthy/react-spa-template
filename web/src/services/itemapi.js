import { fetchFn as http } from "./api";

export async function getItems(nameFilter, pageToken) {
  const res = await http(
    `/api/items?${nameFilter ? "nameFilter=" + nameFilter : ""}${
      nameFilter && pageToken ? "&" : ""
    }${pageToken ? "page=" + pageToken : ""}`
  );
  return await res.json();
}

export async function getItem(id) {
  const res = await http("/api/items/" + id);
  return await res.json();
}

export async function upsertItem(itemid, name, type, hsn, sac, gst, igst) {
  const data = {
    itemid,
    name,
    type,
    hsn,
    sac,
    gst,
    igst,
  };

  const params = {
    method: "PUT",
    body: JSON.stringify(data),
  };

  const res = await http("/api/items", params);
  return await res.json();
}

import { useState, useEffect } from "react";
import { Page, Block, List, ListItem, ListInput } from "framework7-react";
import { getInvoices } from "../services/invoiceapi";
import { PageControls } from "../components/page_controls";

export const ListInvoicesPage = (props) => {
  const [searchText, setSearchText] = useState(
    "query" in props.f7route.query
      ? props.f7route.query["query"]
      : ""
  );
  const initialPageToken =
    "page" in props.f7route.query ? parseInt(props.f7route.query["page"]) : 1;
  const [pageToken, setPageToken] = useState(initialPageToken);
  const [invoicesListResponse, setInvoicesList] = useState({
    invoices: [],
    totalSize: 0,
  });

  useEffect(async () => {
    try {
      const content = await props.task(getInvoices(searchText, pageToken));
      setInvoicesList(content);
    } catch { }
  }, []);

  const handleSearch = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    const page = searchText.length == 0 ? initialPageToken : 1;
    try {
      const res = await props.task(getInvoices(searchText, page));
      setInvoicesList(res);
      setPageToken(page);
    } catch { }
  };

  return (
    <Page>
      <Block strong>
        <div className="list">
          <ul>
            <ListInput
              label="Search"
              floatingLabel
              outline
              placeholder="Enter customer name or invoice id"
              type="search"
              value={searchText}
              onChange={handleSearch}
            />
            <li>
              <a className="button" href="/invoices/new/">
                Add new invoice
              </a>
            </li>
            <li>
              <List>
                {invoicesListResponse.invoices.map((inv) => (
                  <ListItem
                    key={inv.invoiceid}
                    title={inv.invoiceid}
                    link={inv.invoiceid}
                  ></ListItem>
                ))}
              </List>
            </li>
            <li>
              <PageControls
                path="invoices"
                filter={searchText}
                currentPage={pageToken}
                nextPage={invoicesListResponse.nextpagetoken}
              />
            </li>
          </ul>
        </div>
      </Block>
    </Page>
  );
};

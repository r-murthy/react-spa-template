import { useState, useEffect } from "react";
import { Page, Block, List, ListItem, ListInput } from "framework7-react";
import { PageControls } from "../components/page_controls";
import { getCustomers } from "../services/custapi";

export const ListCustomersPage = (props) => {
  const [searchText, setSearchText] = useState(
    "query" in props.f7route.query
      ? props.f7route.query["query"]
      : ""
  );
  const initialPageToken =
    "page" in props.f7route.query ? parseInt(props.f7route.query["page"]) : 1;
  const [pageToken, setPageToken] = useState(initialPageToken);
  const [customersListResponse, setCustomersList] = useState({
    customers: [],
    totalSize: 0,
  });

  useEffect(async () => {
    try {
      const customers = await props.task(getCustomers(searchText, pageToken));
      setCustomersList(customers);
    } catch { }
  }, []);

  const handleSearch = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    const page = searchText.length == 0 ? initialPageToken : 1;
    try {
      const res = await props.task(getCustomers(searchText, page));
      setCustomersList(res);
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
              placeholder="Customer Name"
              type="search"
              value={searchText}
              onChange={handleSearch}
            />
            <li>
              <a className="button" href="/customers/new/">
                Add new customer
              </a>
            </li>
            <li>
              <List>
                {customersListResponse.customers.map((cust) => (
                  <ListItem
                    key={cust.customerid}
                    title={cust.name}
                    link={cust.customerid}
                  ></ListItem>
                ))}
              </List>
            </li>
            <li>
              <PageControls
                path="customers"
                filter={searchText}
                currentPage={pageToken}
                nextPage={customersListResponse.nextpagetoken}
              />
            </li>
          </ul>
        </div>
      </Block>
    </Page>
  );
};

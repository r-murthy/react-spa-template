import { useState, useEffect } from "react";
import { Page, Block, List, ListItem, ListInput } from "framework7-react";
import { getItems } from "../services/itemapi";
import { PageControls } from "../components/page_controls";

export const ListItemsPage = (props) => {
  const [searchText, setSearchText] = useState(
    "query" in props.f7route.query
      ? props.f7route.query["query"]
      : ""
  );
  const initialPageToken =
    "page" in props.f7route.query ? parseInt(props.f7route.query["page"]) : 1;
  const [pageToken, setPageToken] = useState(initialPageToken);
  const [itemsListResponse, setItemsList] = useState({
    items: [],
    totalSize: 0,
  });

  useEffect(async () => {
    try {
      const content = await props.task(getItems(searchText, pageToken));
      setItemsList(content);
    } catch { }
  }, []);

  const handleSearch = async (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    const page = searchText.length == 0 ? initialPageToken : 1;
    try {
      const res = await props.task(getItems(searchText, page));
      setItemsList(res);
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
              placeholder="Item Name"
              type="search"
              value={searchText}
              onChange={handleSearch}
            />
            <li>
              <a className="button" href="/items/new/">
                Add new item
              </a>
            </li>
            <li>
              <List>
                {itemsListResponse.items.map((item) => (
                  <ListItem
                    key={item.itemid}
                    title={item.name}
                    link={item.itemid}
                  ></ListItem>
                ))}
              </List>
            </li>
            <li>
              <PageControls
                path="items"
                filter={searchText}
                currentPage={pageToken}
                nextPage={itemsListResponse.nextpagetoken}
              />
            </li>
          </ul>
        </div>
      </Block>
    </Page>
  );
};

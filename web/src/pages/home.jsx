import { Page, Block } from "framework7-react";

export const HomePage = () => {
  return (
    <Page>
      <Block strong>
        <div className="row">
          <div className="card">
            <div className="card-content card-content-padding">
              <div>
                <a href="/about/" className="link">
                  About
                </a>
                <br />
                <a href="/customers" className="link">
                  Customers
                </a>
                <br />
                <a href="/items" className="link">
                  Items
                </a>
                <br />
                <a href="/invoices" className="link">
                  Invoices
                </a>
              </div>
            </div>
          </div>
        </div>
      </Block>
    </Page>
  );
};

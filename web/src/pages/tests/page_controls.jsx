import { Page } from "framework7-react";
import { PageControls } from "../../components/page_controls";

export const TestPageControls = (props) => {
  const TESTPAGESCOUNT = 3;

  const currentPage =
    "page" in props.f7route.query ? parseInt(props.f7route.query["page"]) : 1;
  const nextPage = currentPage > TESTPAGESCOUNT ? undefined : currentPage + 1;

  return (
    <Page>
      <p>Page Content - Page #{currentPage}</p>
      <PageControls
        path="tests/page-controls"
        currentPage={currentPage}
        nextPage={nextPage}
      />
    </Page>
  );
};

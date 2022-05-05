import { useState, useEffect } from "react";
import { Page, Link } from "framework7-react";
import { pingApi } from "../services/pingapi";

export const AboutPage = (props) => {
  const [item, setItem] = useState("");

  useEffect(() => {
    props.task(pingApi()).then((res) => {
      setItem(res.status);
    });
  }, []);

  return (
    <Page>
      <p>About</p>
      <div> {item}</div>
      <Link href="/">Home</Link>
    </Page>
  );
};

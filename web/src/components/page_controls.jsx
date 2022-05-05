import "../../css/page_controls.css";

export const PageControls = (props) => {
  const query = props.filter
    ? `query=${props.filter}&`
    : "";
  return (
    <ul className="navigation-group">
      {!!(props.currentPage > 1) && (
        <li className="navigators">
          <a href={`/${props.path}/?${query}page=${props.currentPage - 1}`}>prev</a>
        </li>
      )}
      <li className="navigators">
        <label>{props.currentPage}</label>
      </li>
      {!!props.nextPage && (
        <li className="navigators">
          <a href={`/${props.path}/?${query}page=${props.nextPage}`}>next</a>
        </li>
      )}
    </ul>
  );
};

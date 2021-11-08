import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const SearchForm = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchQuery);
  const { text } = searchQuery;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <form className="form-inline my-0" onSubmit={handleSubmit}>
      <input
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
        onChange={handleChange}
        style={{ color: "white" }}
      />
      {/* my-2 my-lg-0 */}
      <SearchOutlined
        className="form-control"
        onClick={handleSubmit}
        style={{ cursor: "pointer" }}
      />
    </form>
  );
};

export default SearchForm;

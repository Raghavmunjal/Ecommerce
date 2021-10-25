import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  listCategoryDetails,
} from "../../../Actions/categoryAction";
import { CATEGORY_UPDATE_RESET } from "../../../Constants/categoryConstant";

const EditCategoryScreen = ({ history, match }) => {
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const categorySlug = match.params.slug;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const { loading: loadingUpdate, success: successUpdate } = categoryUpdate;

  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { loading: loadingDetails, category } = categoryDetails;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCategory(name, categorySlug));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      history.push("/admin/category");
    } else {
      if (!category.name || category.slug !== categorySlug) {
        dispatch(listCategoryDetails(categorySlug));
      } else {
        setName(category.name);
      }
    }
  }, [dispatch, successUpdate, history, categorySlug, category]);

  const categoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
            disabled={loadingUpdate}
          />
          <button
            type="submit"
            className="btn btn-primary btn-raised my-4"
            disabled={!name || loadingUpdate}
          >
            {loadingUpdate ? <span>Updating..</span> : <span>Update</span>}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-6 offset-md-2">
          {loadingUpdate ? (
            <h4 className="text-danger">Updating...</h4>
          ) : (
            <h4>Update Category</h4>
          )}
          {categoryForm()}
          {loadingDetails && <h1 className="text-danger">Loading .....</h1>}
        </div>
      </div>
    </div>
  );
};

export default EditCategoryScreen;

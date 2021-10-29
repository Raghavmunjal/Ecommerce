import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCategory,
  listCategoryDetails,
} from "../../../Actions/categoryAction";
import {
  CATEGORY_UPDATE_RESET,
  CATEGORY_DETAILS_RESET,
} from "../../../Constants/categoryConstant";
import CategoryForm from "../../../Components/CategoryForm";
import { Spin } from "antd";

const CategoryEditScreen = ({ history, match }) => {
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
      dispatch({ type: CATEGORY_DETAILS_RESET });
      history.push("/admin/category");
    } else {
      if (!category.name || category.slug !== categorySlug) {
        dispatch(listCategoryDetails(categorySlug));
      } else {
        setName(category.name);
      }
    }
  }, [dispatch, successUpdate, history, categorySlug, category]);

  return (
    <Spin spinning={loadingDetails} tip="Loading..." size="large">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col-md-8 offset-md-1">
            <h4>Update Category</h4>
            <hr />
            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              loading={loadingUpdate}
              type="update"
            />
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default CategoryEditScreen;

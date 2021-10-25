import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  createCategory,
  listCategories,
  deleteCategory,
} from "../../../Actions/categoryAction";
import { CATEGORY_CREATE_RESET } from "../../../Constants/categoryConstant";

const CreateCategoryScreen = () => {
  const [name, setName] = useState("");

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    category: createdCategory,
  } = categoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { loading: loadingList, categories } = categoryList;

  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { loading: loadingDelete, success: successDelete } = categoryDelete;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory(name));
  };

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteCategory(slug));
    }
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
    }
    dispatch(listCategories());
  }, [dispatch, successCreate, successDelete, createdCategory]);

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
            disabled={loadingCreate}
          />
          <button
            type="submit"
            className="btn btn-primary btn-raised my-4"
            disabled={loadingCreate || !name}
          >
            Save
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
          {loadingCreate || loadingDelete ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}
          {categoryForm()}
          {loadingList && <h1 className="text-danger">Loading .....</h1>}
          {categories.map((category) => {
            return (
              <div key={category._id} className="alert alert-secondary">
                {category.name}
                <span className="btn btn-sm float-right">
                  <DeleteOutlined
                    onClick={() => handleDelete(category.slug)}
                    className="text-danger"
                  />
                </span>
                <Link to={`/admin/category/${category.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-primary" />
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryScreen;

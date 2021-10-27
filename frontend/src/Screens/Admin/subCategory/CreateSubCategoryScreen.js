import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createSubCategory,
  listSubCategories,
  deleteSubCategory,
} from "../../../Actions/subCategoryAction";
import { listCategories } from "../../../Actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { SUBCATEGORY_CREATE_RESET } from "../../../Constants/subCategoryConstant";
import CategoryForm from "../../../Components/CategoryForm";
import LocalSearch from "../../../Components/LocalSearch";

const CreateSubCategoryScreen = () => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const subCategoryCreate = useSelector((state) => state.subCategoryCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    category: createdSubCategory,
  } = subCategoryCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { loading: loadingSubCategoriesList, subCategories } = subCategoryList;

  const subCategoryDelete = useSelector((state) => state.subCategoryDelete);
  const { success: successDelete } = subCategoryDelete;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubCategory(name, category));
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: SUBCATEGORY_CREATE_RESET });
      setName("");
    }
    dispatch(listSubCategories());
  }, [dispatch, successCreate, successDelete, createdSubCategory]);

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteSubCategory(slug));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-6 offset-md-2">
          <h4>Create SubCategory</h4>

          <div className="form-group">
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select a category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            loading={loadingCreate}
            type="create"
          />
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />
          {loadingSubCategoriesList && (
            <h1 className="text-danger">Loading .....</h1>
          )}
          {subCategories
            .filter((c) => c.name.toLowerCase().includes(keyword))
            .map((category) => {
              return (
                <div key={category._id} className="alert alert-secondary">
                  {category.name}
                  <span className="btn btn-sm float-right">
                    <DeleteOutlined
                      onClick={() => handleDelete(category.slug)}
                      className="text-danger"
                    />
                  </span>
                  <Link to={`/admin/subcategory/${category.slug}`}>
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

export default CreateSubCategoryScreen;

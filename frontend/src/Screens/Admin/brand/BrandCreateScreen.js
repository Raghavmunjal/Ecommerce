import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  createBrand,
  listBrands,
  deleteBrand,
} from "../../../Actions/brandAction";
import { listCategories } from "../../../Actions/categoryAction";
import { useDispatch, useSelector } from "react-redux";
import { BRAND_CREATE_RESET } from "../../../Constants/brandConstant";
import CategoryForm from "../../../Components/CategoryForm";
import LocalSearch from "../../../Components/LocalSearch";

const BrandCreateScreen = () => {
  const [name, setName] = useState("");
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const brandCreate = useSelector((state) => state.brandCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    brand: createdBrand,
  } = brandCreate;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { loading: loadingBrandsList, brands } = brandList;

  const brandDelete = useSelector((state) => state.brandDelete);
  const { success: successDelete } = brandDelete;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBrand(name, category));
  };

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: BRAND_CREATE_RESET });
      setName("");
    }
    dispatch(listBrands());
  }, [dispatch, successCreate, successDelete, createdBrand]);

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteBrand(slug));
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          <h3 style={{ textAlign: "center", marginTop: 55, color: "#001529" }}>
            Create Brand
          </h3>
          <div className="underline"></div>
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
          {loadingBrandsList && <h1 className="text-danger">Loading .....</h1>}
          {brands
            .filter((c) => c.name.toLowerCase().includes(keyword))
            .map((brand) => {
              return (
                <div key={brand._id} className="alert alert-secondary">
                  {brand.name}
                  <span className="btn btn-sm float-right">
                    <DeleteOutlined
                      onClick={() => handleDelete(brand.slug)}
                      className="text-danger"
                    />
                  </span>
                  <Link to={`/admin/brand/${brand.slug}`}>
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

export default BrandCreateScreen;

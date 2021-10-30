import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, deleteProduct } from "../../../Actions/productAction";
import AdminNav from "../../../Components/nav/AdminNav";
import AdminProductCard from "../../../Components/AdminProductCard";
import { listCategories } from "../../../Actions/categoryAction";

const ProductListScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const productList = useSelector((state) => state.productList);
  const { loading: loadingList, products, page, pages } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts(category, pageNumber));
  }, [dispatch, category, successDelete, pageNumber]);

  const handleDelete = (slug) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteProduct(slug));
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          {products.length > 0 ? (
            <h3
              style={{ textAlign: "center", marginTop: 55, color: "#001529" }}
            >
              All Products
            </h3>
          ) : (
            <h3
              style={{ textAlign: "center", marginTop: 55, color: "#40a9ff" }}
            >
              No Product Found
            </h3>
          )}
          <div className="underline"></div>
          <div className="form-group">
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Please select a category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          {products.length > 0 && (
            <div className="row">
              {products.map((product) => {
                return (
                  <div key={product._id} className="col-md-4">
                    <AdminProductCard
                      product={product}
                      loading={loadingList}
                      handleDelete={handleDelete}
                    />
                  </div>
                );
              })}
            </div>
          )}
          <p>Page : {page}</p>
          <p>Pages : {pages}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductListScreen;

// .filter((p) => {
//   if (category !== "") {
//     return p.category._id === category;
//   } else return p;
// })

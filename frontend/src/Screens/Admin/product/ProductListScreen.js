import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listProducts, deleteProduct } from "../../../Actions/productAction";
import AdminNav from "../../../Components/nav/AdminNav";
import ProductCard from "../../../Components/ProductCard";
import { listCategories } from "../../../Actions/categoryAction";

const ProductListScreen = () => {
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
    dispatch(listProducts(category));
  }, [dispatch, category, successDelete]);

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
        <div className="col">
          {products.length > 0 ? (
            <h4>Products</h4>
          ) : (
            <h4 className="text-danger">No Product Found</h4>
          )}
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
                    <ProductCard
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

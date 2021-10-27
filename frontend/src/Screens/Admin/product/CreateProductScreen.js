import React, { useState } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useDispatch } from "react-redux";
import { createProduct } from "../../../Actions/productAction";
import ProductForm from "../../../Components/ProductForm";

const intialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategories: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Blue", "Black", "Brown", "Silver", "White"],
  brands: [
    "Apple",
    "Samsung",
    "Microsoft",
    "Lenevo",
    "Asus",
    "Dell",
    "Hp",
    "Acer",
  ],
  color: "",
  brand: "",
};

const CreateProductScreen = () => {
  const [values, setValues] = useState(intialState);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(values));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 offset-md-1">
          <h4>Create Product</h4>
          <hr />
          <ProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductScreen;

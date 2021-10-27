import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/nav/AdminNav";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../Actions/productAction";
import ProductForm from "../../../Components/ProductForm";
import { listCategories } from "../../../Actions/categoryAction";
import { listSubCategories } from "../../../Actions/subCategoryAction";
import { listBrands } from "../../../Actions/brandAction";
import FileUpload from "../../../Components/FileUpload";
import { PRODUCT_CREATE_RESET } from "../../../Constants/productConstant";

const intialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subCategory: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Red", "Green", "Blue", "Black", "Brown", "Silver", "White", "Grey"],
  color: "",
  brand: "",
};

const CreateProductScreen = () => {
  const [values, setValues] = useState(intialState);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const subCategoryList = useSelector((state) => state.subCategoryList);
  const { subCategories } = subCategoryList;

  const brandList = useSelector((state) => state.brandList);
  const { brands } = brandList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    //product: createdProduct,
  } = productCreate;

  useEffect(() => {
    if (successCreate) {
      window.alert(`Product created`);
      dispatch({ type: PRODUCT_CREATE_RESET });
      window.location.reload();
    }
    dispatch(listCategories());
    dispatch(listSubCategories());
    dispatch(listBrands());
  }, [dispatch, successCreate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(values));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      category: e.target.value,
      subCategory: [],
    });
    setShow(true);
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

          <div className="p-3">
            <FileUpload values={values} setValues={setValues} />
          </div>

          <ProductForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            setValues={setValues}
            categories={categories}
            subCategories={subCategories}
            handleCategoryChange={handleCategoryChange}
            brands={brands}
            show={show}
            loading={loadingCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProductScreen;

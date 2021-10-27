import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./Reducers/UserReducer";
import {
  categoryCreateReducer,
  categoryListReducer,
  categoryDetailsReducer,
  categoryDeleteReducer,
  categoryUpdateReducer,
} from "./Reducers/CategoryReducer";
import {
  subCategoryCreateReducer,
  subCategoryListReducer,
  subCategoryDeleteReducer,
  subCategoryDetailsReducer,
  subCategoryUpdateReducer,
} from "./Reducers/SubCategoryReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  categoryCreate: categoryCreateReducer,
  categoryDelete: categoryDeleteReducer,
  categoryDetails: categoryDetailsReducer,
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  subCategoryCreate: subCategoryCreateReducer,
  subCategoryList: subCategoryListReducer,
  subCategoryDelete: subCategoryDeleteReducer,
  subCategoryUpdate: subCategoryUpdateReducer,
  subCategoryDetails: subCategoryDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const intialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  intialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

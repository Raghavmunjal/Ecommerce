import axios from "axios";
export const getSortedProducts = async (sort, order, page) =>
  await axios.post(`/api/product/all`, {
    sort,
    order,
    page,
  });

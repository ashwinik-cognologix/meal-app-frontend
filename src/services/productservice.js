import axios from "axios";
import qs from "qs";
const baseURL = "http://localhost:1337/api";

export const getProductList = () => {
  const query = qs.stringify(
    {
      populate: "*",
      fields: "*",
      publicationState: "live",
      locale: ["en", "de"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  let url = `${baseURL}/products?filters[isActive][$eq]=${"true"}&${query}`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export const loginUser = (email, password) => {
  let url = `${baseURL}/platformusers?filters[email][$eq]=${email}&filters[password][$eq]=${password}`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export const addMeals = (meal) => {
  let url = `${baseURL}/products`;

  return axios.post(url, { data: meal }).then((response) => {
    return response.data;
  });
};

export const upload = (file) => {
  let url = `${baseURL}/upload`;

  return axios.post(url, file).then((response) => {
    return response.data;
  });
};

export const addOrder = (order) => {
  let url = `${baseURL}/orders`;

  return axios.post(url, { data: order }).then((response) => {
    return response.data;
  });
};

export const getCategory = () => {
  let url = `${baseURL}/categories`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export const getProductListByCategory = (category) => {
  const query = qs.stringify(
    {
      populate: "*",
      fields: "*",
      publicationState: "live",
      locale: ["en", "de"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  let url = `${baseURL}/products?filters[category][$eq]=${category}&filters[isActive][$eq]=${"true"}&${query}`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export const getOrder = () => {
  const userid = localStorage.getItem("userid");

  let url = `${baseURL}/orders?filters[userId][$eq]=${userid}`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export const addUserAddress = (userData) => {
  let url = `${baseURL}/addresses`;

  return axios.post(url, { data: userData }).then((response) => {
    return response.data;
  });
};

export const getUserAddress = () => {
  const userid = localStorage.getItem("userid");

  let url = `${baseURL}/addresses?filters[userid][$eq]=${userid}`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export const deleteUserAddress = (id) => {
  let url = `${baseURL}/addresses/${id}`;

  return axios.delete(url).then((response) => {
    return response.data;
  });
};

export const addOrderDetails = (cartdetails) => {
  let url = `${baseURL}/orderdetails`;

  return axios.post(url, { data: cartdetails }).then((response) => {
    return response.data;
  });
};

export const getOrderDetails = (id) => {
  let url = `${baseURL}/orderdetails?filters[orderId][$eq]=${id}`;

  return axios.get(url).then((response) => {
    return response.data;
  });
};

export const addUser = (user) => {
  console.log(user);
  let url = `${baseURL}/platformusers`;

  return axios.post(url, { data: user }).then((response) => {
    return response.data;
  });
};

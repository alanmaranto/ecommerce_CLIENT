const host = process.env.REACT_APP_API_URL || "localhost:8000";

const postHeader = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

const api = {
  host,
  auth: {
    postUser(data) {
      const url = `${host}/user/signup`;
      postHeader.body = JSON.stringify(data);
      return fetch(url, postHeader);
    }
  }
};

export default api;

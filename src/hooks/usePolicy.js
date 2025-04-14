import  API  from "../service/API";

export const usePolicy = {

  getPolicies: () => API.get("/Policies"),
  getPolicyById: (id) => API.get(`/Policies/${id}`),
  createPolicy: (data) => API.post("/Policies", data),
  updatePolicy: (id, data) => API.put(`/Policies/${id}`, data),
  deletePolicy: (id) => API.delete(`/Policies/${id}`),
  searchPolicy
}
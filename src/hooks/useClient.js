
import  API  from "../service/API";

export const useClient = {

  getClients: () => API.get("/Clients"),
  getClientById: (id) => API.get(`/Clients/${id}`),
  createClient: (data) => API.post("/Clients", data),
  updateClient: (id, data) => API.put(`/Clients/${id}`, data),
  deleteClient: (id) => API.delete(`/Clients/${id}`),

}



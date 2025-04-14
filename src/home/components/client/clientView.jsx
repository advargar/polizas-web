// src/components/ClientsList.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../../../store/client/clientSlice";

const clientView = () => {
  const dispatch = useDispatch();
  const { clients, loading, error } = useSelector((state) => state.client); // Changed from state.clients to state.client
  console.log("Datos de Redux:", { clients, loading, error }); 
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Clients List</h2>
      <ul>
        {clients.map((client) => (
          <li key={client.InsureId}>
            {client.Name} {client.FirstSurname} {client.SecondSurname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default clientView;
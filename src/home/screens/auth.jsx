
import { useState } from "react";

export const auth = () => {
  const [status, setStatus] = useState("idle"); //idle,  signup, signin, error
  function propSetStatus(value) {
    setStatus(value);
  }
  return (
    <div className="container">
      <h2 className="text-center">ACCESO EXITOSO</h2>
      
      <br />
     
        <h2 className="text-center">REGISTRO EXITOSO</h2>
    
    </div>
  );
};

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import SinglePicker from "./SinglePicker";

const DetallePicker = () => {

  const { userid } = useParams();
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const getPicker = async() => {
      const res = await fetch(`https://2cdp8hndph.execute-api.us-east-1.amazonaws.com/production/api/events/picker/${userid}`);
      const data = await res.json();
      setLoading(false)
      setOrder(data.evento);
  }


  useEffect(() => {
    getPicker();
  }, [userid]);
  
  return (
    <div>
      {
        loading ? 
          <h2>Cargando...</h2>
        : 
        <div>  
            {order.map( (singleOrder ) => ( 
              <div key={singleOrder.userid}>
                <SinglePicker nombre={singleOrder.nombre} email={singleOrder.userid} tienda={singleOrder.tienda}/>
              </div>
               
            ))}
          </div>
        
      }
    </div>
  );
};


export default DetallePicker
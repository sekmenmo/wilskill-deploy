import React, { useState, useEffect } from "react";
import Axios from "axios";

function DataCall() {
  const [state, setState] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/triptype`).then((res) => {
            if (res) {
                console.log(res);
                setState(res.data);
            }
      }).catch((error) => {
        console.log(error);});
    }, []); 
    
    return (
        <div className='data'>
            {state.map(state => <div key={state.ID}> {state.TripType} </div>)}
        </div>
    )
}
export default DataCall;

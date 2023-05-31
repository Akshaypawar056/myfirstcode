import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Details() {
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({});
  console.log(formData);
  

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        
        const res = await axios.get(`/api/user1/list/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        
        setFormData(res.data);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div className='container mi-3'>
      <Link to="/" type="button" className="btn btn-secondary mt-5">
        Back
      </Link>

      
        <div className='container'>
          <h3>Name: {formData.name}</h3>
          <h3>Age: {formData.age}</h3>
          <h3>Email: {formData.email}</h3>
          <h3>Mobile: {formData.mobile}</h3>
          <h3>Work: {formData.work}</h3>
          <h3>Address: {formData.add}</h3>
          <h3>Description: {formData.desc}</h3>
        </div>
    
    </div>
  );
}

export default Details;

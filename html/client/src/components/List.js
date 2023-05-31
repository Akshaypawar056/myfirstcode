import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const List = () => {
    const [formData, setFormData] = useState([]);
    console.log(formData);
    const getdata = async () => {
        try {
            const res = await axios.get('/api/user1/list');
            setFormData(res.data);
            console.log(res.data);
        } catch (err) {
            console.error(err.response.data);
        }
     };
    
    useEffect(() => {
        getdata();
    }, []);

    const userdelete = async (id) => {
        try {
          const res = await axios.delete(`/api/user1/deleteuser/${id}`, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (res.status === 400 || !res.data) {
            console.log("error");
          } else {
            console.log("user delete");
            getdata();
          }
          // Show a success message or perform any additional actions
        } catch (err) {
          console.error(err);
          // Show an error message or handle the error
        }
      };
      
      

    return (
        <div className="mt-5">
            <div className='container'>
                <div className='add_btn mt-2 mb-2'>
                    <Link className='btn btn-primary' to="/Userdata">Add data</Link>
                </div>

                <table className="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">id</th>
                            <th scope="col">name</th>
                            <th scope="col">email</th>
                            <th scope="col">work</th>
                            <th scope="col">mobile</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map((data, id) => (


                            <tr key={data.id}>
                                <th scope="row">{id + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.work}</td>
                                <td>{data.mobile}</td>
                                <td className='d-flex justify-content-between'>
                                    <Link to={`details/${data._id}`} className='btn btn-outline-primary'>view</Link>
                                    <Link to={`edit/${data._id}`} className='btn btn-outline-warning'>update</Link>
                                    <button className='btn btn-outline-danger' onClick={() => userdelete(data._id)}>Delete</button>

                                </td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default List;

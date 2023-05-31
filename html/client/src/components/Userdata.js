
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Userdata = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    mobile: '',
    work: '',
    add: '',
    desc: ''
  });

  const { name, email, age, mobile, work, add, desc } = formData;
  const onChange = e => 
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    console.log(formData);
    setFormData({
      name: '',
      email: '',
      age: '',
      mobile: '',
      work: '',
      add: '',
      desc: ''
    });
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
  
      const body = JSON.stringify(formData);
      const res = await axios.post('/api/user1', body, config);
      console.log(res.data);
      if (res.status === 400 || !res.data) {
        alert("error");
        console.error("error");
      } else {
        alert("data added");
        console.log("data added");
      }
      
    } catch (err) {
      console.error(err.response.data);
    }
 
  
};

  return (
    
  
    <div className='container'>

<Link to="/" type="button" class="btn btn-secondary mt-5">back</Link>

      <form className='mt-4' onSubmit={e => onSubmit(e)}>
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
            <input type="text" name="name" value={name} onChange={e => onChange(e)} className="form-control" id="exampleInputEmail1" />

          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">Email</label>
            <input type="email" name="email" value={email} onChange={e => onChange(e)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">Age</label>
            <input type="text" name="age" value={age} onChange={e => onChange(e)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
            <input type="number" name="mobile" value={mobile} onChange={e => onChange(e)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">Work</label>
            <input type="text" name="work" value={work} onChange={e => onChange(e)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
            <input type="text" name="add" value={add} onChange={e => onChange(e)} className="form-control" id="exampleInputPassword1" />
          </div>
          <div className="mb-3 col-lg-12 col-md-12 col-12 mt-4">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <textarea name="desc" value={desc} onChange={e => onChange(e)} className='form-control' id="" cols="90" rows="5"></textarea>
          </div>


          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

    </div>
  
  )
};

export default Userdata;

import React from 'react'
import classes from "./DeliveryAvailability.module.css"
import { useState, useEffect } from 'react'
import api from "../../api/axiosConfig"
import axios from 'axios'


export const DeliveryAvailability = () => {

  const [business, setBusiness] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firtIndex = lastIndex - recordsPerPage;
  const records = business ? business.slice(firtIndex, lastIndex) : [];
  const npage = Math.ceil((business && business.length) / recordsPerPage) || 0;
  const numbers = [...Array(npage + 1).keys()].slice(1)


  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const response = await api.get('/all');
      console.log(response.data);
      setBusiness(response.data.businesses);

    } catch (error) {
      console.log("Error loading businesses: ", error);
    }
  };


  const handleVerify = async () => {
    try {
      const response = await api.post('/availability', { latitude, longitude });
      console.log(response.data); 
      setBusiness(response.data.businesses);
      fetchBusinessData();
    } catch (error) {
      console.error('Error availability:', error);
    }
  };

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1)
    }
  }
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }

  }



  return (

    <div>
      <div className={'row mt-5'}>

        <div className='col-4'>
          <h2 className='mb-4'>Delivery Availability</h2>
          <h6 style={{ color: '#9B9B9B', marginBottom: '40px' }}>Verify Delivery Availability for User's Location</h6>
        </div>

        <div className={"col-7 " + classes.grpField}>
          <div className={classes.textfield}>
            <label htmlFor="latitude">latitude</label>
            <input
              type="text"
              id='latitude'
              className={'form-control ' + classes.input}
              name='latitude'
              onChange={(e) => setLatitude(e.target.value)}
              value={latitude}
              placeholder='EX: 34.020883'
            />
          </div>
          <div className={classes.textfield}>
            <label htmlFor="longitude">longitude</label>
            <input
              type="text"
              id='logitude'
              className={'form-control ' + classes.input}
              name='longitude'
              onChange={(e)=>setLongitude(e.target.value)}
              value={longitude}
              placeholder='EX: -6.841650'
            />
          </div>

          <button onClick={handleVerify} className={'btn btn-secondary ' + classes.button} >Verify</button>

        </div>


      </div>
      <table className={"table " + classes.table}>
        <thead className='table-secondary'>
          <tr>
            <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Name</th>
            <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Phone</th>
            <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>latitude</th>
            <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>longitude</th>
            <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Delivery Distance</th>
            <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Availability</th>
          </tr>
        </thead>
        <tbody className=' table-secondary'>
          {records.map((b) => (
            <tr key={b.name}>
              <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.name}</td>
              <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.phone}</td>
              <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.latitude}</td>
              <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.longitude}</td>
              <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.distance}</td>
              {b.availability === 0 && <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}><span style={{ backgroundColor: "#1E1E1E", color: "#FFFF" }}>TRUE</span></td>}
              {b.availability === 1 && <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}><span style={{ backgroundColor: "#9296AC", color: "#FFFF" }}>FALSE</span></td>}
            </tr>
          ))}

        </tbody>
        <tfoot>
            <ul className='pagination'>
              <li className={`page-item`}>
                <a type='button' className={classes.page_linkn}  onClick={prePage}>Previous page</a>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a type='button' className={currentPage === n? classes.page_link_active : classes.page_link} onClick={()=>{setCurrentPage(n)}}>{n}</a>
                  </li>
                ))
              }
              <li className={`page-item`}><a type='button' className={classes.page_linkn}  onClick={nextPage}>Next page</a>
              </li>
            </ul>
          </tfoot>
      </table>
    </div>

  )
}



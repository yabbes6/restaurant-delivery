import React from 'react'
import classes from "./AllBusiness.module.css"
import { useState, useEffect } from 'react'
import api from "../../api/axiosConfig"


export const AllBusiness = () => {

  const [business, setBusiness] = useState([]);
  const [counts, setCounts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState([]);


  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const response = await api.get('/all');
      console.log(response.data);
      setBusiness(response.data.businesses);
      setCounts({
        italianCount: response.data.counts.italianCount,
        mexicanCount: response.data.counts.mexicanCount,
        indianCount: response.data.counts.indianCount
      });
    } catch (error) {
      console.log("Error loading businesses: ", error);
    }
  };

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setCurrentPage(1);
    setFilterValue(value.trim().toLowerCase());
  };

  const filteredData = business.filter(item => {

    return item.phone.toLowerCase().includes(filterValue);

  });

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

  const recordsPerPage = 6;
  const lastIndex = currentPage * recordsPerPage;
  const firtIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firtIndex, lastIndex);
  const npage = Math.ceil(filteredData.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)




  return (
    <div>
      <div className={"row mb-5 " + classes.allBloc}>
        <div className={'col-4 ' + classes.bloc}>
          <h2>{counts.italianCount}</h2>
          <h6>Italian restaurant</h6>
        </div>
        <div className={'col-4 ' + classes.bloc}>
          <h2>{counts.indianCount}</h2>
          <h6>Indian restaurant</h6>
        </div>
        <div className={'col-4 ' + classes.bloc}>
          <h2>{counts.mexicanCount}</h2>
          <h6>Mexican restaurant</h6>
        </div>
      </div>
      <div>
        <div className={classes.search}>
          <div>
            <h2 className='mb-4'>All businesses</h2>
            <h6 style={{ color: '#9B9B9B', marginBottom: '40px' }}>Monitor sales and status.</h6>
          </div>
          <div className={"input-group mb-3 " + classes.inputSearch}>
            <span className={"input-group-text " + classes.icon} id="basic-addon1"><i className='fa fa-search '></i></span>
            <input type="text" className="form-control" onChange={handleFilterChange} name='phone' value={filterValue} placeholder="Search by phone" aria-describedby="basic-addon1" />
          </div>
        </div>
        <table className={"table " + classes.table}>
          <thead className='table-secondary'>
            <tr>
              <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Name</th>
              <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Phone</th>
              <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Type</th>
              <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>latitude</th>
              <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>longitude</th>
              <th style={{ backgroundColor: '#F7F7F7', borderColor: "#F2F2F2", padding: '20px' }}>Delivery Distance</th>
            </tr>
          </thead>
          <tbody className='table-secondary'>
            {records.map((b) => (
              <tr key={b.name}>
                <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.name}</td>
                <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.phone}</td>
                {b.type === "Italian" && <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}> <span style={{ color: "#4c8163", backgroundColor: "#deede5" }}>{b.type}</span></td>}
                {b.type === "Indian" && <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}> <span style={{ color: "#a0921f", backgroundColor: "#fdf8ce" }}>{b.type}</span></td>}
                {b.type === "Mexican" && <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}> <span style={{ color: "#427a5b", backgroundColor: "#ff896b" }}>{b.type}</span></td>}
                <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.latitude}</td>
                <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.longitude}</td>
                <td style={{ backgroundColor: '#FCFCFC', borderColor: "#F2F2F2", padding: '20px' }}>{b.distance}</td>
              </tr>
            ))}

          </tbody>
          <tfoot>
            <ul className='pagination'>
              <li className={`page-item`}>
                <a type='button' className={classes.page_linkn} onClick={prePage}>Previous page</a>
              </li>
              {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                    <a type='button' className={currentPage === n ? classes.page_link_active : classes.page_link} onClick={() => { setCurrentPage(n) }}>{n}</a>
                  </li>
                ))
              }
              <li className={`page-item`}><a type='button' className={classes.page_linkn} onClick={nextPage}>Next page</a>
              </li>
            </ul>
          </tfoot>
        </table>
      </div>
    </div>
  )

}

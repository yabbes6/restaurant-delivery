import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import classes from './NavBar.module.css'

export const NavBar = () => {
    const [title, setTitle] = useState("Business Information");


    return (
        <div className='navbar navbar-expand'>
            <div className={'navbar-nav ' + classes.nav_title}>
                <i className='fa fa-Business'></i>
                <h2>{title}</h2>
            </div>

            <ul className={'navbar-nav ' + classes.nav_pages}>
                <li onClick={() => { setTitle("Business Information") }}><Link className={'nav-link ' + classes.nav_link} to='/'>Business Information</Link>{title === 'Business Information' ? <hr /> : <></>}</li>
                <li onClick={() => { setTitle("All Business") }}><Link className={'nav-link ' + classes.nav_link} to='/allBusiness'> All Business</Link>{title === 'All Business' ? <hr /> : <></>}</li>
                <li onClick={() => { setTitle("Delivery Availability") }}><Link className={'nav-link ' + classes.nav_link} to='/deliveryAvailability'>Delivery Availability</Link>{title === 'Delivery Availability' ? <hr /> : <></>}</li>
            </ul>
        </div>
    )
}

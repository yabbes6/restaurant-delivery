import React, { useState } from 'react'
import classes from './BusinessInformations.module.css'
import api from "../../api/axiosConfig"

export const BusinessInformations = () => {


    const [entries, setEntries] = useState({
        name: "",
        phone: "",
        type: "Italian",
        latitude: "",
        longitude: "",
        distance: "",
        availability: 1

    })

    const handleEntries = (event) => {
        setEntries({ ...entries, [event.target.name]: event.target.value })
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        const business = {
            name: entries.name,
            phone: entries.phone,
            type: entries.type,
            latitude: entries.latitude,
            longitude: entries.longitude,
            distance: entries.distance,
            availability: entries.availability
        };
        try {
            const response = await api.post('/add', business);
            console.log(response.data)
        } catch (error) {
            window.alert("something messing in your information!!");
            console.log(error.error.message)
        }

    }

    return (
        <form className={'row ' + classes.style} onSubmit={submitHandler}>
            <div className='col-6'>
                <h5>Business informations</h5>
                <div className={classes.textfield}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id='name'
                        className={'form-control ' + classes.input}
                        name='name'
                        onChange={handleEntries}
                        value={entries.name}
                        placeholder='EX: Spice Garden' required
                    />
                </div>
                <div className={classes.textfield}>
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id='phone'
                        className={'form-control ' + classes.input}
                        name='phone'
                        onChange={handleEntries}
                        value={entries.phone}
                        placeholder='EX: 0689021736' required
                    />
                </div>
                <div className={classes.textfield}>
                    <label htmlFor="type">Type</label>
                    <select className={'form-select ' + classes.input} value={entries.type} name='type' onChange={handleEntries} >
                        <option value="Italian">Italian restaurant</option>
                        <option value="Indian">Indian restaurant</option>
                        <option value="Mexican">Mexican restaurant</option>
                    </select>
                </div>
            </div>
            <div className='col-6'>
                <h5>Adress</h5>
                <div className={classes.textfield}>
                    <label htmlFor="latitude">latitude</label>
                    <input
                        type="text"
                        id='latitude'
                        className={'form-control ' + classes.input}
                        name='latitude'
                        onChange={handleEntries}
                        value={entries.latitude}
                        placeholder='EX: 34.020883' required
                    />
                </div>
                <div className={classes.textfield}>
                    <label htmlFor="longitude">longitude</label>
                    <input
                        type="text"
                        id='logitude'
                        className={'form-control ' + classes.input}
                        name='longitude'
                        onChange={handleEntries}
                        value={entries.longitude}
                        placeholder='EX: -6.841650'required
                    />
                </div>
                <div className={classes.textfield}>
                    <label htmlFor="distance">Delivery Distance (km)</label>
                    <input
                        type="text"
                        id='distance'
                        className={'form-control ' + classes.input}
                        name='distance'
                        onChange={handleEntries}
                        value={entries.distance}
                        placeholder='EX: 5' required
                    />
                </div>
                <div hidden className={classes.textfield}>
                    <input
                        type="text"
                        id='availability'
                        className={'form-control ' + classes.input}
                        name='availability'
                        onChange={handleEntries}
                        value={entries.availability} required
                    />
                </div>
            </div>
            <button className={"btn btn-success " + classes.button} type='submit'>Valider</button>
        </form>
    )
}

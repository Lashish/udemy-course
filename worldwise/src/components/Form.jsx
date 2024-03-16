import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Button from './Button'
import BackButton from './BackButton'
import styles from './Form.module.css'
import { useUrlPosition } from '../hooks/useUrlPosition';

export function convertToEmoji(countryCode) {
    const codePoints = countryCode.toUpperCase().split().map((char) => 127397 + char.charAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
function Form() {
    const [ mapLat, mapLng ] = useUrlPosition();
    const [ cityName, setCityName ] = useState("");
    const [ date, setDate ] = useState(new Date())
    const [ notes, setNotes ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ countryCode, setCountryCode ] = useState("")
    const [ isLoadingGeolocation, setIsLoadingGeolocation ] = useState(false);

    useEffect(function () {
        async function fetchCityData() {
            try {
                setIsLoadingGeolocation(true);
                const res = await fetch(`${BASE_URL}?latitude=${mapLat}&longitude=${mapLng}`);
                const data = await res.json();
                console.log(data)
                if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else😊");
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setCountryCode(data.countryCode);

            } catch {
                (error);
            } finally {
                setIsLoadingGeolocation(false);
            }

        }
        fetchCityData();
    }, [ mapLat, mapLng ])

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label>City Name</label>
                <input type='text' id='cityName' onChange={(e) => setCityName(e.target.value)} value={cityName} />

            </div>
            <div className={styles.row}>
                <label htmlFor='date'>When did you go to cityName?</label>
                <DatePicker
                    id="date"
                    onChange={(date) => setDate(date)}
                    selected={date}
                    dateFormat={"dd / MM / yyyy"}
                />


            </div>
            <div className={styles.row}>
                <label>Notes about your trip to cityName</label>
                <textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes}> </textarea>
            </div>
            <div className={styles.buttons}><Button type="primary" onClick={() => { }}>Add</Button> <BackButton /></div>
        </form >
    )
}

export default Form
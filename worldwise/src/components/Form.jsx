import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Spinner from './Spinner'
import Message from './Message'
import Button from './Button'
import BackButton from './BackButton'
import styles from './Form.module.css'
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useCities } from '../contexts/citiesContext'
import { useNavigate } from 'react-router-dom'

export function convertToEmoji(countryCode) {
    const codePoints = countryCode.toUpperCase().split().map((char) => 127397 + char.charAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;
function Form() {
    const [ lat, lng ] = useUrlPosition();
    const [ cityName, setCityName ] = useState("");
    const [ emoji, setEmoji ] = useState();
    const [ date, setDate ] = useState(new Date())
    const [ notes, setNotes ] = useState("");
    const [ country, setCountry ] = useState("");
    const [ countryCode, setCountryCode ] = useState("")
    const [ isLoadingGeolocation, setIsLoadingGeolocation ] = useState(false);
    const { createCity, isLoading } = useCities()
    const navigate = useNavigate();

    useEffect(function () {
        async function fetchCityData() {
            try {
                setIsLoadingGeolocation(true);
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
                const data = await res.json();
                // console.log(data)
                if (!data.countryCode) throw new Error("That doesn't seem to be a city. Click somewhere else😊");
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setCountryCode(data.countryCode);
                setEmoji(data.countryCode);

            } catch {
                (error);
            } finally {
                setIsLoadingGeolocation(false);
            }

        }
        fetchCityData();
    }, [ lat, lng ]);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!cityName && !date) return;
        let newCity = {
            cityName,
            country,
            date,
            emoji,
            notes,
            position: { lat, lng },

        };
        // console.log(newCity);
        await createCity(newCity);
        navigate('/app/cities')
    }

    if (isLoadingGeolocation) return <Spinner />;

    if (!lat && !lng) return <Message message='Click somewhere in map!' />;


    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor='cityName'>City Name{/*<span>{emoji}</span>*/}</label>
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
                <label htmlFor='notes'>Notes about your trip to cityName</label>
                <textarea id='notes' onChange={(e) => setNotes(e.target.value)} value={notes}> </textarea>
            </div>
            <div className={styles.buttons}><Button type="primary">Add</Button> <BackButton /></div>
        </form >
    )
}

export default Form
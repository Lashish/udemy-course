import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import { useCities } from '../contexts/citiesContext';
import Spinner from './Spinner'
import styles from './City.module.css'
import BackButton from './BackButton'

const dateFormat = (date) => {
    return (
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(date)))
}

function City() {
    const { id } = useParams();
    const { getCity, currentCity, isLoading } = useCities();
    useEffect(function () {
        getCity(id);
    }, [ id ]);
    const { cityName, emoji, date, notes } = currentCity;

    if (isLoading) return <Spinner />
    return (
        <div className={styles.city}>
            <div className={styles.row}>
                <h6>City name </h6>
                <h3>
                    <span> {emoji} </span>   {cityName}
                </h3>
            </div>
            <div className={styles.row}>
                <h6>you want to {cityName} on</h6>
                <p>{dateFormat(date || null)}</p>
            </div>
            {notes && (<div><h6> your notes</h6>
                <p>{notes}</p>
            </div>)}
            <div className={styles.row}>
                <h6>Learn more</h6>
                <a href={`https://en.wikipedia.org/wiki/${cityName}`} target='_blank' rel='norefferrer'>Check out {cityName} on wikipedia &rarr;</a>
            </div>
            <div><BackButton /></div>
        </div>
    )
}

export default City
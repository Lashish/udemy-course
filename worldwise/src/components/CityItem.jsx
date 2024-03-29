import React from 'react'
import styles from "./CityItem.module.css";
import { Link, useNavigate } from 'react-router-dom';
import { useCities } from '../contexts/citiesContext';
const dateFormat = (date) => {
    return (
        new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(date)))
}

function CityItem({ city }) {
    const { cityName, emoji, date, id, position } = city;
    const { deleteCity } = useCities();
    const navigate = useNavigate();

    async function handeleDelete(e) {
        e.preventDefault();
        await deleteCity(id);
        navigate('/app/cities');
    }
    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({dateFormat(date)})</time>
                <button className={styles.deleteBtn} onClick={handeleDelete} >&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
import React from 'react'
import styles from "./CountryItem.module.css";

function CountryItem({ city }) {
    return (
        <li className={styles.countryItem}>
            <span>{city.emoji}</span>
            <h3>{city.country}</h3>
        </li>
    )
}

export default CountryItem
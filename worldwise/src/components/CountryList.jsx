import React from 'react'
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css"
import Spinner from './Spinner';

function CountryList({ cities, isLoading }) {
    if (isLoading) return <Spinner />
    return (
        <ul className={styles.countryList}>
            {cities.map((city) => (
                <CountryItem city={city} key={city.cityName} />
            ))}
        </ul>
    )
}

export default CountryList
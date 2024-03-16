import React from 'react';
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css"
import Spinner from './Spinner';
import { useCities } from '../contexts/citiesContext';
function CountryList() {
    const { cities, isLoading } = useCities();
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
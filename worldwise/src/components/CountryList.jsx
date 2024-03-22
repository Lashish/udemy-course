import React from 'react';
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css"
import Spinner from './Spinner';
import { useCities } from '../contexts/citiesContext';
function CountryList() {
    const { cities, isLoading } = useCities();


    if (isLoading) return <Spinner />
    if (!cities.length) return;
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country)) {
            return [ ...arr, { country: city.country, emoji: city.emoji } ];
        } else return arr;
    }, []);
    console.log(countries)
    return (
        <ul className={styles.countryList}>
            {countries.map((city) => (
                <CountryItem city={city} key={city.country} />
            ))}
        </ul>
    )
}

export default CountryList
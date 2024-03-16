import React from 'react';
import CityItem from './CityItem';
import styles from "./CityList.module.css";
import Spinner from './Spinner';
import { useCities } from '../contexts/citiesContext';

function CityList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />
    return (
        <ul className={styles.cityList}>
            {cities.map((city) => (<CityItem city={city} key={city.id} />))}
        </ul>
    )
}

export default CityList;
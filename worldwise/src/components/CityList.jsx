import React from 'react';
import CityItem from './CityItem';
import styles from "./CityList.module.css";
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from '../contexts/citiesContext';

function CityList() {
    const { cities, isLoading } = useCities();
    if (isLoading) return <Spinner />
    return (
        <ul className={styles.cityList}>
            {cities.length ? cities.map((city) => (<CityItem city={city} key={city.id} />)) : <Message message="Click somewhere on the map!" />}
        </ul>
    )
}

export default CityList;
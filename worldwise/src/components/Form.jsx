import React from 'react'
import DatePicker from 'react-datepicker'
import Button from './Button'
import BackButton from './BackButton'
import styles from './Form.module.css'

function Form() {
    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label>City Name</label>
                <input type='text' />
            </div>
            <div className={styles.row}>
                <label htmlFor='date'>When did you go to cityName?</label>
                {/* <DatePicker
                    id="date"
                    dateFormat="dd/mm/yyyy"
                /> */}
                <input type='date' />

            </div>
            <div className={styles.row}>
                <label>Notes about your trip to cityName</label>
                <textarea row="2" cols="8"></textarea>
            </div>
            <div className={styles.buttons}><Button type="primary" onClick={() => { }}>Add</Button> <BackButton /></div>
        </form>
    )
}

export default Form
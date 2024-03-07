import styles from "./Button.module.css"
// eslint-disable-file 
function Button({ type, onClick, children }) {
    return (
        <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>
    )
}

export default Button
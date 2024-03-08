import PageNav from "../components/PageNav"
import Button from "../components/Button"
import styles from "./Login.module.css";

function Login() {
    const handleSubmit = () => { };
    return (
        <main className={styles.login}>
            <PageNav />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <label>Email address</label>
                    <input type="email" />
                </div>
                <div className={styles.row}>

                    <label>Password</label>
                    <input type="password" />

                </div>
                <div>
                    <Button type="primary">Login</Button>
                </div>
            </form>
        </main>
    )
}

export default Login
import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

function Product() {
    return (
        <main className={styles.pricing}>
            <PageNav />
            <section>
                <div>
                    <img src="/img-1.jpg" alt="product image" />
                </div>
                <div>
                    <h2>About WorldWise.</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est dicta illum vero culpa cum quaerat architecto sapiente eius non soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga perspiciatis?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus libero sunt expedita ratione iusto, magni, id sapiente sequi officiis et.</p>
                </div>
            </section>
        </main>
    )
}

export default Product;
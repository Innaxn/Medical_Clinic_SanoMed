import React, {useState } from "react"
 import styles from './HomePage.module.css'
 import Image from "../components/images/SanoMed.png";

function HomePage() {


    return (
         <div className={styles.main}>
            {/* <div> */}
                {/* <img src={Image} alt="backgroundimg" height={130}></img> */}
            {/* </div> */}
            <div className={styles.containerhome}>
            <div className={styles.siteTitle}>
                <h2>SanoMed, <br/>the best care you need</h2>
            </div>
            <div className={styles.logincontainer}>
                   
            </div>
            </div>
        </div>
    )
}

export default HomePage
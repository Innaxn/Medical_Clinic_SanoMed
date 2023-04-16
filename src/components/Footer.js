import React from "react"
import styles from './Footer.module.css'
import Image from "../components/images/logo.png";

function Footer() { return (
    <div className={styles.container}>
        <div className="left">
        <img src={Image} alt="logo" height={190} ></img>
        <h3>Working hours</h3>
            <ul className={styles.timeslots}>
                <li> Monday – Friday from 09:00 till 15:00</li>
                <li> Saturday – Sunday: closed</li>
            </ul>
        </div>
        <div className={styles.right}>
            <h3>Contacts</h3>
            <ul className={styles.right}>
                <li className="contact">
                    +31612625533
                </li>
                <li>
                Voornsehoek, 1181 CL, 5 Eindhoven, the Netherlands
                </li>
            </ul>
            
        </div>
        
    </div>
)
}

export default Footer;
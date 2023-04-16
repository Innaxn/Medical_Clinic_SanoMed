import React from "react"
import { Link } from "react-router-dom"
import styles from './Header.module.css'
import Image from "../components/images/logo.png";

function Header() { return (
    <div className={styles.container}>
        <Link className="nav-link" to="/">
          <img
            src={Image} alt="logo"
            height={150}
            className="d-inline-block align-top"
          /></Link>
        <ul className={styles.timeslots}>
        <li> Monday – Friday from 09:00 till 15:00</li>
        <li> Saturday – Sunday: closed</li>
        </ul>
    </div>
)
}

export default Header;
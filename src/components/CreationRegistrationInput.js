import React, { useState } from 'react'
import styles from "./RegistrationInput.module.css"

function CreationRegistrationInput(props) {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, onChange, id, ...inputProps } = props;

    const handleFocus = (e) => {
        setFocused(true);
    };

    return (
        <div className={styles.registrationInput}>
            <label className={styles.labelcreation}> {label}</label>
            <input className={styles.inputCreation} {...inputProps} onChange={onChange}
                onBlur={handleFocus}
                onFocus={() =>
                    inputProps.name === "confirmPassword" && setFocused(true)
                }
                focused={focused.toString()} ></input>
            <span>{errorMessage}</span>
        </div>
    )
}

export default CreationRegistrationInput
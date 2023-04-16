import React from 'react'
import styles from './NotAuthorizedPage.module.css'

function NotAuthorizedPage() {

    return (
        <>
            <body>
                <div class={styles.message}>You are not authorized.
                </div>
                <div class={styles.message2}>You tried to access a page you did not have prior authorization for.</div>
                <div class={styles.container}>
                    <div class={styles.neon}>403</div>
                    <div class={styles.doorframe}>
                        <div  class={styles.door}>
                            <div  class={styles.rectangle}>
                            </div>
                            <div class={styles.handle}>
                            </div>
                            <div class={styles.window}>
                                <div class={styles.eye}>
                                </div>
                                <div class={styles.eye2}>
                                </div>
                                <div class={styles.leaf}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body><div>NotAuthorizedPage</div>
        </>
    )
}

export default NotAuthorizedPage
import React from 'react';
import { Link } from 'react-router';
import styles from './Header.css';
import { FormattedMessage } from 'react-intl';

function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>
                ReactJS
            </h1>

            <nav role="navigation" className={styles.navigation}>
                <Link to="/" className={styles.link}>
                    <FormattedMessage id="title.home"/>
                </Link>
                <a
                    className={styles.link}
                    href="https://github.com/abetancur/projectReactjs"
                    target="_blank"
                >
                    GitHub
                </a>
            </nav>
        </header>
    )
}

export default Header;
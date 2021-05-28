import Image from 'next/image'
import { FunctionComponent } from 'react';

import styles from '../styles/Header.module.scss';

const Header: FunctionComponent = () => <header>
    <nav className={styles['nav-menu']}>
        <a href="/" className={styles.logo}>
            <Image
                src="/logo-ramo-texto.svg"
                height="75px"
                width="100%"
            />
        </a>
    </nav>
</header>

export default Header;

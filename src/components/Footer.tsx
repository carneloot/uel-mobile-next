import { FunctionComponent } from 'react';

import styles from '@styles/components/Footer.module.scss';

const Footer: FunctionComponent = () => <footer className={styles.footer}>
    <p className="copyright">
        &copy; Matheus Carnelutt | {new Date().getFullYear()}
    </p>
    <p className="notice">
        Esse site não tem relação com a Universidade Estadual de Londrina.
    </p>
</footer>;

export default Footer;

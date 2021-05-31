import { FunctionComponent } from 'react';

import styles from '@styles/components/Footer.module.scss';

const Footer: FunctionComponent = () => <footer className={styles.footer}>
    <div className={styles.foot}>
        &copy; Ramo Estudantil IEEE-UEL | 2017
        <br/><span className={styles['easter-egg']}>béééééééh</span>
    </div>
</footer>;

export default Footer;

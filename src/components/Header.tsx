import Image from 'next/image'
import { FunctionComponent } from 'react';

import MenuIcon from './MenuIcon';

import styles from '@styles/components/Header.module.scss';

interface HeaderProps {
    showMenuButton?: boolean;
    isMenuOpened?: boolean;
    onClickMenu?: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({ showMenuButton, isMenuOpened, onClickMenu }) => {
    const menuOpenedClass = isMenuOpened ? styles.open : '';

    return <header>
        <nav className={styles['nav-menu']}>
            <a href="/" className={styles.logo}>
                <Image
                    src="/logo-ramo-texto.svg"
                    height="75px"
                    width="100%"
                />
            </a>
            {(showMenuButton ?? false) && (
                <div className={styles['btn-menu'] + ' ' + menuOpenedClass} onClick={onClickMenu}>
                    <MenuIcon
                        opened={isMenuOpened}
                    />
                </div>
            )}
        </nav>
    </header>
}

export default Header;

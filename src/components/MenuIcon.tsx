import { FunctionComponent } from 'react';

import styles from '@styles/components/MenuIcon.module.scss'

type MenuIconProps = Partial<Record<'opened', boolean>>;

const MenuIcon: FunctionComponent<MenuIconProps> = ({ opened }) =>
    <div
        className={`${styles.icon} ${opened && styles.open || ''}`}
    >
        <svg
            version="1.1"
            id="Capa_1"
            // xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 53 53"
        // xml:space="preserve"
        >
            <g>
                <g>
                    <path className={styles.b1} d="M2,13.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,13.5,2,13.5z" />
                    <path className={styles.b2} d="M2,28.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,28.5,2,28.5z" />
                    <path className={styles.b3} d="M2,43.5h49c1.104,0,2-0.896,2-2s-0.896-2-2-2H2c-1.104,0-2,0.896-2,2S0.896,43.5,2,43.5z" />
                </g>
            </g>
        </svg>
    </div>;

export default MenuIcon;

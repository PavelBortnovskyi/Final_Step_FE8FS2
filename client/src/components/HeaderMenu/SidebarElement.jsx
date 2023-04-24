import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from 'src/styles/HeaderMenu.module.scss';

export const SidebarElement = ({Icon, text, path}) => {
    return (
        <div className={styles.HeaderMenu__item}>
            <Icon sx={{ fontSize: 30 }} />
            <NavLink
                to="/"
                className={styles.HeaderMenu__subitem}
            >
                {text}
            </NavLink>
        </div>
    )
}

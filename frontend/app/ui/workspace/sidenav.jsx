'use client';
import { useEffect } from 'react';
import NavLinks from './nav-links';
import { useSidenav } from './sidenav-context';
import GraphEditMenu from './graph-edit-menu';
import DisplaySettings from './display-settings';
import GraphFilter from './graph-filter';
import InfoBox from './infobox';
import styles from "./sidenav.module.css";

export default function SideNav() {
    const { sideNavDisplayed } = useSidenav();

    useEffect(() => {
        function setHeight() {
            document.documentElement.style.setProperty('--window-inner-height', `${window.innerHeight}px`);
        }

        setHeight();

        window.addEventListener('resize', setHeight);
    }, []);

    return (
        <>
            <div className={`${styles.sidenavContent}  ${!sideNavDisplayed ? styles.sidenavDisplayed : ''}`}>
                <NavLinks />
                <div className={styles.sidenavScrollContainer}>
                    <GraphEditMenu />

                    <DisplaySettings />
                    <GraphFilter />
                </div>

                <InfoBox />
            </div>
        </>
    );
} 
'use client';
import Link from 'next/link';
import NavLinks from './nav-links';
import { useSidenav } from './sidenav-context';
import GraphEditMenu from './graph-edit-menu';
import DisplaySettings from './display-settings';
import GraphFilter from './graph-filter';
import InfoBox from './infobox';

import styles from "./sidenav.module.css";

export default function SideNav() {
    const { sideNavDisplayed } = useSidenav();

    return (
        <>
            <div className={`${styles.sidenavContent}  ${!sideNavDisplayed ? styles.sidenavDisplayed : ''}`}>
                <NavLinks />
                <GraphEditMenu />

                <DisplaySettings />
                <GraphFilter />

                <InfoBox />
            </div>

        </>
    );
} 
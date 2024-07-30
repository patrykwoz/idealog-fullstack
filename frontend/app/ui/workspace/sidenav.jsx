
import Link from 'next/link';
import NavLinks from './nav-links';
import GraphEditMenu from './graph-edit-menu';
import DisplaySettings from './display-settings';


import styles from "./sidenav.module.css";


export default function SideNav() {
    return (
        <>
            <div>
                <NavLinks />
                <GraphEditMenu />
                <DisplaySettings />

            </div>
        </>
    );
}
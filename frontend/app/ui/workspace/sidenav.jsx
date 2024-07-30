
import Link from 'next/link';
import NavLinks from './nav-links';
import GraphEditMenu from './graph-edit-menu';
import DisplaySettings from './display-settings';
import GraphFilter from './graph-filter';


import styles from "./sidenav.module.css";


export default function SideNav() {
    return (
        <>
            <div>
                <NavLinks />
                <GraphEditMenu />
                <DisplaySettings />
                <GraphFilter />

            </div>
        </>
    );
}
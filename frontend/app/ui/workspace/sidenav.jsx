
import Link from 'next/link';
import { cookies } from 'next/headers'
import NavLinks from './nav-links';
import { SidenavProvider } from './sidenav-context';
import GraphEditMenu from './graph-edit-menu';
import DisplaySettings from './display-settings';
import GraphFilter from './graph-filter';
import InfoBox from './infobox';

import styles from "./sidenav.module.css";

export default function SideNav() {
    const cookieStore = cookies();
    let sideNavDisplayed = cookieStore.get('sideNavDisplayed');

    return (
        <>
            {/* wrap these two in a context */}
            {/* render modals inside - try keeping this a server component */}
            <SidenavProvider>
                <div className={`${styles.sidenavContent}`}>

                    <NavLinks />
                    <GraphEditMenu />



                    <DisplaySettings />
                    <GraphFilter />

                    <InfoBox />
                </div>
            </SidenavProvider>
        </>
    );
} 
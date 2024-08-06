'use client';
import Link from 'next/link';
import NavLinks from './nav-links';
import { useSidenav } from './sidenav-context';
import GraphEditMenu from './graph-edit-menu';
import DisplaySettings from './display-settings';
import GraphFilter from './graph-filter';
import InfoBox from './infobox';

import NodeDetailModal from '@/app/ui/workspace-modals/node-detail-modal';

import styles from "./sidenav.module.css";

export default function SideNav() {
    const { sideNavDisplayed } = useSidenav();

    const tempNode = {
        "owner_email": "ryan@admin.com",
        "updated_at": 1722610824720,
        "description": "I love shapes.",
        "labels": [
          "Idea"
        ],
        "name": "Shapes",
        "created_at": 1722610824720,
        "owner_sql_id": 32
      };



    return (
        <>
            <div className={`${styles.sidenavContent}  ${!sideNavDisplayed ? styles.sidenavDisplayed : ''}`}>
                <NavLinks />
                <GraphEditMenu />

                <DisplaySettings />
                <GraphFilter />

                <InfoBox />
            </div>

            {/* <NodeDetailModal nodeWithDetail={tempNode} /> */}

        </>
    );
} 
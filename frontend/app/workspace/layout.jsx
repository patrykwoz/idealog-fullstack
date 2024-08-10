import { auth } from "@/auth"
import SideNav from "../ui/workspace/sidenav";
import TopNav from "../ui/workspace/topnav";
import BottomNav from "../ui/workspace/bottomnav";
import { SidenavProvider } from "../ui/workspace/sidenav-context";

import styles from "./workspace.module.css";

export const metadata = {
    title: "Idealog",
    description: "Your research assistant",
};

export default async function Layout({ children }) {
    const session = await auth();
    const user = session.user;    

    return (
        <>
            <SidenavProvider user={user}>
                <div className={styles.workspaceContainer} >
                    <div className={`${styles.sideNavContainer} noSelect`}>
                        <SideNav />
                    </div>
                    <div className={styles.graphCanvasContainer}>
                        <TopNav />
                        {children}
                        <BottomNav />
                    </div>
                </div>
            </SidenavProvider>

        </>
    );
}

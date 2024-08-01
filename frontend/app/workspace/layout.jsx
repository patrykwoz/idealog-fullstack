import SideNav from "../ui/workspace/sidenav";
import TopNav from "../ui/workspace/topnav";
import BottomNav from "../ui/workspace/bottomnav";
import styles from "./workspace.module.css";

export const metadata = {
    title: "Idealog",
    description: "Your research assistant",
};

export default function Layout({ children }) {
    return (
        <>
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

        </>
    );
}

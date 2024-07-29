import SideNav from "../ui/workspace/sidenav";
import styles from "./styles.module.css";

export const metadata = {
    title: "Idealog",
    description: "Your research assistant",
};

export default function Layout({ children }) {
    return (
        <>
            {/* TopNav */}
            <div className={styles.workspaceContainer} >
                <div className={styles.sideNavContainer}>
                    <SideNav />

                </div>
                <div className={styles.graphCanvasContainer}>
                    {children}
                </div>
            </div>

        </>
    );
}


import { getRelationships, getNodes } from "@/app/lib/actions"
import GraphCanvas from "@/app/ui/workspace/graph-canvas";
import ZoomMenu from "@/app/ui/workspace/zoom-menu";
import styles from "./workspace.module.css";


export default async function Workspace({searchParams}) {
    let relations = []
    let nodes = []
    try {
        relations = await getRelationships();
        nodes = await getNodes(searchParams);
    } catch (error) {
        console.error('Error getting nodes and relationships');
    }

    return (
        <>
            <main className={styles.graphCanvas}>
                {nodes.length > 0 && (
                    <>
                        <GraphCanvas neo4j_nodes={nodes} relations={relations} />
                        <ZoomMenu />
                    </>
                )}
            </main>
        </>
    );
}
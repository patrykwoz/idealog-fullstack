
import { auth } from "@/auth"
import { getIdeas, getRelationships, getNodes } from "@/app/lib/actions"
import GraphCanvas from "@/app/ui/workspace/graph-canvas";
import ZoomMenu from "@/app/ui/workspace/zoom-menu";
import styles from "./workspace.module.css";


export default async function Workspace() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>

    let relations = []
    let nodes = []
    try {
        relations = await getRelationships();
        nodes = await getNodes();
    } catch (error) {
        console.log(error);
    }

    return (
        <>
            <main className={styles.graphCanvas}>

                {/* don't forget to revalidate this component after adding an idea to the graph db */}

                {nodes.length > 0 && (

                    // <Canvas ideas={ideas} relations={relations}/>
                    <>
                        <GraphCanvas ideas={nodes} relations={relations} />
                        <ZoomMenu />
                    </>



                )}


            </main>
        </>
    );
}
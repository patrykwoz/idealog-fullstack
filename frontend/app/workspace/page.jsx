
import { auth } from "@/auth"
import { getIdeas, getRelations, getNodes } from "@/app/lib/actions"
import Canvas from "@/app/ui/workspace/canvas"
import CanvasSim from "@/app/ui/workspace/canvas-sim"
import styles from "./styles.module.css";


export default async function Workspace() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>

    let ideas = []
    let relations = []
    let nodes = []
    try {
        ideas = await getIdeas();
        relations = await getRelations();
        nodes = await getNodes();
    } catch (error) {
        console.log(error);
    }
    console.log('IDEAS')
    console.log(ideas);
    console.log('NODES')
    console.log(nodes);

    return (
        <>
            <main className={styles.workspace}>
                <div>
                    <h1>Welcome to the idealog workspace, {session.user?.email}!</h1>
                </div>

                {/* don't forget to revalidate this component after adding an idea to the graph db */}

                { nodes.length > 0 && (

                    // <Canvas ideas={ideas} relations={relations}/>
                    <CanvasSim ideas={nodes} relations={relations} />


                )}


            </main>
        </>
    );
}
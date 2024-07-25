
import { auth } from "@/auth"
import { getIdeas } from "@/app/lib/actions"
import Canvas from "@/app/ui/workspace/canvas"
import styles from "./styles.module.css";


export default async function Workspace() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>

    let ideas = []
    try {
        ideas = await getIdeas()
    } catch (error) {
        console.log(error);
    }

    return (
        <>
            <main className={styles.workspace}>
                <div>
                    <h1>Welcome to the workspace, {session.user?.email}!</h1>
                </div>

                {ideas.length > 0 && (

                    <Canvas ideas={ideas} />


                )}


            </main>
        </>
    );
}
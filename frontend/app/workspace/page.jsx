
import { auth } from "@/auth"
import { getIdeas } from "@/app/lib/actions"

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
            <main className="flex items-center justify-center md:h-screen">
                <div>
                    <h1>Welcome to the workspace, {session.user?.email}!</h1>
                </div>
                <div>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </div>

                {ideas.length > 0 && (
                    <div>
                        <h2  >Ideas</h2>
                        <ul>
                            {ideas.map((idea) => (
                                <li key={idea.name}>
                                    <div>
                                        <h3>name: {idea.name} </h3>
                                    </div>
                                    <div>
                                        <p>description: {idea.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </main>
        </>
    );
}




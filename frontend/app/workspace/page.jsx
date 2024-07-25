
import { auth } from "@/auth"

export default async function Workspace() {
    const session = await auth()
    if (!session) return <div>Not authenticated</div>
    return (
        <>
            <main className="flex items-center justify-center md:h-screen">
                <div>
                    <h1>Welcome to the workspace!</h1>
                </div>
                <div>
                    <pre>{JSON.stringify(session, null, 2)}</pre>
                </div>
            </main>
        </>
    );
}




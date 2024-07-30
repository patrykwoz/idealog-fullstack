import Image from "next/image";
import { pingServer, getToken, currentUser } from "@/app/client/api_actions";

export default async function Home() {

  let response = await pingServer();
  console.log(response.message);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to Idealog! 🚀</h1>
        <p>{response.message}</p>

      </main>
    </>
  );
};


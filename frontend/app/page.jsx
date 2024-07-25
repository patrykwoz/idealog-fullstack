import Image from "next/image";
import { pingServer, getToken, currentUser } from "@/app/client/api_actions";
import Svg from "@/app/ui/workspace/svg";

export default async function Home() {

  let response = await pingServer();
  console.log(response.message);

  let username = process.env.FIRST_SUPERUSER;
  let password = process.env.FIRST_SUPERUSER_PASSWORD;

  let {access_token} = await getToken(username, password);
  let meUser = await currentUser(access_token);
  console.log(meUser);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to Idealog! 🚀</h1>
        <p>{response.message}</p>
        <div>
          <Svg />
        </div>

      </main>
    </>
  );
};


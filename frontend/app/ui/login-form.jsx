import { signIn } from "@/auth"

export function SignIn() {
  return (
    <>
      <form
        action={async (formData) => {
          // TODO: Abstract this into a function and UseActionState to handle this logic
          "use server"
          await signIn("credentials", formData, { redirectTo: "/workspace" })
        }}
      >
        <label>
          Email
          <input name="email" type="email" autoComplete="username" />
        </label>
        <label>
          Password
          <input name="password" type="password" autoComplete="current-password" />
        </label>
        <button>Sign In</button>
      </form>
    </>
  )
}
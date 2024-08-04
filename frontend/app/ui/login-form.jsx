import { login } from "../lib/actions"
import ModalContainer from "./containers/modal-container"

import styles from "./login-form.module.css"


export function SignIn() {
  return (
    <>
      <ModalContainer>
        <div className={styles.loginFormContainer}>

          <div className={styles.loginFormHeader}>
            <p>Login to IdeaLog</p>

          </div>

          <div className={styles.loginFormDivider}></div>

          <form
            action={login}
            className={styles.loginForm}

          >
            <label>
              Email

            </label>
            <input name="email" type="email" autoComplete="username" />

            <label>
              Password

            </label>
            <input name="password" type="password" autoComplete="current-password" />
            <button>Login</button>
          </form>
          
        </div>

      </ModalContainer>
    </>
  )
}
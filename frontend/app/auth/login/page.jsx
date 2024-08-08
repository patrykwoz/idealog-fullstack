import { SignIn } from '@/app/ui/login-form';
import ModalContainer from '@/app/ui/containers/modal-container';
import styles from './login.module.css';

export default function LoginPage() {
    return (
        <main className={styles.loginContainer}>
                <SignIn />
        </main>
    );
}
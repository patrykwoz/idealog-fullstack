import {SignIn} from '@/app/ui/login-form';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div>
                <SignIn />
            </div>
        </main>
    );
}
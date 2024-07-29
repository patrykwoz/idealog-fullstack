import Link from 'next/link';
import { PencilSquareIcon, PowerIcon, PlusCircleIcon, Bars4Icon } from '@heroicons/react/24/outline';


export default function NavLinks() {
    return (
        <>
            <div>
                <Bars4Icon className="w-6 icons" />
                <Link href="/">
                    <PlusCircleIcon className="w-6 icons" />
                </Link>
                <Link href="/">
                    <PencilSquareIcon className="w-6 icons" />
                </Link>
            </div>
        </>
    );
}
'use client';
import {useState, useEffect} from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import {
    PencilSquareIcon,
    ArrowRightCircleIcon,
    ArrowRightIcon,
} from '@heroicons/react/24/outline';

import styles from "./display-settings.module.css";

export default function DisplaySettings() {
    const router = useRouter();
    const pathname = usePathname();
    const searchhParams = useSearchParams();

    const [nodesLimit, setNodesLimit] = useState(1000);

    useEffect(() => {
        let newUrl = `${pathname}?limit=${nodesLimit}`;
        router.push(newUrl);
    }
    , [nodesLimit, router]);

    // const handleNodesLimitChange = (e) => {
    //     setNodesLimit(e.target.value);
    // }

    async function submitNodesLimit(formData){
        const rawFormData = {
            limit: formData.get('nodes-limit'),
        }
        setNodesLimit(rawFormData.limit);
    }
    
    return (
        <>
            <div className={styles.displaySettingsContainer}>
                <div className={styles.displaySettingsHeader}>
                    <p>Graph Display Settings</p>

                </div>
                {/* number of nodes, auto generated / added manuallyl by user, public/private */}

                <form action={submitNodesLimit} className={styles.displaySettingsFormItem}>
                    <label htmlFor="nodes-limit">Nodes Limit</label>
                    <input
                        type="number"
                        id='nodes-limit'
                        name='nodes-limit'
                        min={10}
                        defaultValue={1000}
                        // onChange={handleNodesLimitChange}
                        />
                    <button className={styles.displaySettingsFormButton}>
                        < ArrowRightIcon className={styles.displaySettingsFormIcon} />
                    </button>

                </form>










            </div>
        </>
    );
}
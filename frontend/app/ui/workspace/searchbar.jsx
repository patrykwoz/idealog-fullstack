import {
    PencilSquareIcon,
    ArrowRightCircleIcon,
    ArrowRightIcon,
    ArrowUpIcon,
} from '@heroicons/react/24/outline';

export default function SearchBar() {
    return (
        <>

            <form action="" className="searchbarForm">
                <input type="text" id='search' />
                <button className="searchbarFormButton">
                    <ArrowUpIcon className="searchbarFormIcon" />
                </button>
            </form>

        </>
    );
}
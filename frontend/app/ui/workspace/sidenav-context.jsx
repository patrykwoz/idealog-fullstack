'use client';
import { createContext, useState, useRef, useContext, useEffect } from "react";

const SidenavContext = createContext();

export function SidenavProvider({ children, user }) {
    const [sideNavDisplayed, setSideNavDisplayed] = useState(true);

    const [ideaModalVisible, setIdeaModalVisible] = useState(false);
    const [knowledgeModalVisible, setKnowledgeModalVisible] = useState(false);
    const [relationshipModalVisible, setRelationshipModalVisible] = useState(false);

    const [filterLabels, setFilterLabels] = useState([]);

    const ideaModalRef = useRef(null);
    const knowledgeModalRef = useRef(null);
    const relationshipModalRef = useRef(null);

    const toggleSideNav = () => {
        setSideNavDisplayed(!sideNavDisplayed);
    }

    const toggleIdeaModal = () => {
        setIdeaModalVisible(!ideaModalVisible);
    }

    const toggleKnowledgeModal = () => {
        setKnowledgeModalVisible(!knowledgeModalVisible);
    }

    const toggleRelationshipModal = () => {
        setRelationshipModalVisible(!relationshipModalVisible);
    }

    const addFilterLabel = (label) => {
        setFilterLabels([...filterLabels, label]);
    }

    const removeFilterLabel = (label) => {
        setFilterLabels(filterLabels.filter((filterLabel) => filterLabel !== label));
    }

    const handleClickOutside = (event) => {
        if (ideaModalRef.current && !ideaModalRef.current.contains(event.target)) {
            setIdeaModalVisible(false);
        }
        if (knowledgeModalRef.current && !knowledgeModalRef.current.contains(event.target)) {
            setKnowledgeModalVisible(false);
        }
        if (relationshipModalRef.current && !relationshipModalRef.current.contains(event.target)) {
            setRelationshipModalVisible(false);
        }
    }

    useEffect(() => {
        if (ideaModalVisible || knowledgeModalVisible || relationshipModalVisible) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ideaModalVisible, knowledgeModalVisible, relationshipModalVisible]);

    return (
        <SidenavContext.Provider value={{
            user,
            sideNavDisplayed,
            ideaModalVisible,
            knowledgeModalVisible,
            relationshipModalVisible,
            filterLabels,
            ideaModalRef,
            knowledgeModalRef,
            relationshipModalRef,
            toggleSideNav,
            toggleIdeaModal,
            toggleKnowledgeModal,
            toggleRelationshipModal,
            addFilterLabel,
            removeFilterLabel
        }}>
            {children}
        </SidenavContext.Provider>
    );
}

export function useSidenav() {
    return useContext(SidenavContext);
}

'use client';
import { createContext, useState, useRef, useContext, useEffect } from "react";

const SidenavContext = createContext();

export function SidenavProvider({ children, user }) {
    const [ideaModalVisible, setIdeaModalVisible] = useState(false);
    const [knowledgeModalVisible, setKnowledgeModalVisible] = useState(false);
    const [relationshipModalVisible, setRelationshipModalVisible] = useState(false);

    const ideaModalRef = useRef(null);
    const knowledgeModalRef = useRef(null);
    const relationshipModalRef = useRef(null);

    const toggleIdeaModal = () => {
        setIdeaModalVisible(!ideaModalVisible);
    }

    const toggleKnowledgeModal = () => {
        setKnowledgeModalVisible(!knowledgeModalVisible);
    }

    const toggleRelationshipModal = () => {
        setRelationshipModalVisible(!relationshipModalVisible);
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
            ideaModalVisible,
            knowledgeModalVisible,
            relationshipModalVisible,
            ideaModalRef,
            knowledgeModalRef,
            relationshipModalRef,
            toggleIdeaModal,
            toggleKnowledgeModal,
            toggleRelationshipModal
        }}>
            {children}
        </SidenavContext.Provider>
    );
}

export function useSidenav() {
    return useContext(SidenavContext);
}

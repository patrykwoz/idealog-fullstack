'use client';
import { createContext, useState, useRef, useContext, useEffect } from "react";

const SidenavContext = createContext();

export function SidenavProvider({ children, user }) {
    const [sideNavDisplayed, setSideNavDisplayed] = useState(true);

    const [ideaModalVisible, setIdeaModalVisible] = useState(false);
    const [knowledgeModalVisible, setKnowledgeModalVisible] = useState(false);
    const [relationshipModalVisible, setRelationshipModalVisible] = useState(false);
    const [nodeDetailModalVisible, setNodeDetailModalVisible] = useState(false);

    const [filterLabels, setFilterLabels] = useState(['Idea', 'KnowledgeSource', 'User']);
    const [searchedNodes, setSearchedNodes] = useState([]);

    const ideaModalRef = useRef(null);
    const knowledgeModalRef = useRef(null);
    const relationshipModalRef = useRef(null);
    const nodeDetailModalRef = useRef(null);

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

    const toggleNodeDetailModal = () => {
        setNodeDetailModalVisible(!nodeDetailModalVisible);
    }

    const addFilterLabel = (label) => {
        setFilterLabels([...filterLabels, label]);
    }

    const removeFilterLabel = (label) => {
        setFilterLabels(filterLabels.filter((filterLabel) => filterLabel !== label));
    }

    const addSearchedNodes = (nodes) => {
        setSearchedNodes([...nodes]);
    }

    const removeSearchedNodes = (nodes) => {
        setSearchedNodes(searchedNodes.filter((searchedNode) => !nodes.includes(searchedNode)));
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
        if (nodeDetailModalRef.current && !nodeDetailModalRef.current.contains(event.target)) {
            setNodeDetailModalVisible(false);
        }
    }

    // if user clicks somewhere on the .graphCanvas main element setSearchedNodes to empty array
    // to remove the search results from the graph

    useEffect(() => {
        if (ideaModalVisible || knowledgeModalVisible || relationshipModalVisible || nodeDetailModalVisible) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ideaModalVisible, knowledgeModalVisible, relationshipModalVisible, nodeDetailModalVisible]);

    return (
        <SidenavContext.Provider value={{
            user,
            sideNavDisplayed,
            ideaModalVisible,
            knowledgeModalVisible,
            relationshipModalVisible,
            nodeDetailModalVisible,
            setNodeDetailModalVisible,
            filterLabels,
            searchedNodes,
            ideaModalRef,
            knowledgeModalRef,
            relationshipModalRef,
            nodeDetailModalRef,
            toggleSideNav,
            toggleIdeaModal,
            toggleKnowledgeModal,
            toggleRelationshipModal,
            toggleNodeDetailModal,
            addFilterLabel,
            removeFilterLabel,
            addSearchedNodes,
            removeSearchedNodes,
        }}>
            {children}
        </SidenavContext.Provider>
    );
}

export function useSidenav() {
    return useContext(SidenavContext);
}

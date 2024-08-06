'use client';

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useSidenav } from "./sidenav-context";
import { getNode } from '@/app/lib/actions';
import styles from "./graph-canvas.module.css";
import NodeDetailModal from "../workspace-modals/node-detail-modal";

function generateCordset(count) {
    return Array(count)
        .fill(0)
        .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
}

export default function GraphCanvas({ ideas, relations }) {
    const [selectedNode, setSelectedNode] = useState(null);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

    const {
        filterLabels,
        searchedNodes,
        nodeDetailModalVisible,
        setNodeDetailModalVisible,
        sideNavDisplayed,
        nodeDetailModalRef,
        toggleNodeDetailModal,
    } = useSidenav();

    const svgRef = useRef(null);
    const gRef = useRef(null);
    const zoomRef = useRef(d3.zoom());

    async function handleNodeClick(event, d) {
        const eventCurrentTarget = event.currentTarget;
        const childCircle = d3.select(eventCurrentTarget).select("circle").node();
        
        const { cx, cy } = eventCurrentTarget;
        let cxValue = eventCurrentTarget.transform.baseVal[0].matrix.e;
        let cyValue = eventCurrentTarget.transform.baseVal[0].matrix.f;

        event.stopPropagation();
        // d3.select(eventCurrentTarget)
        //     .classed(styles.highlightNode, !d3.select(eventCurrentTarget)
        //         .classed(styles.highlightNode));

        const nodeWithDetail = await getNode(d.id);
        setSelectedNode(nodeWithDetail);

        setModalPosition({
            top: cyValue + 25,
            left: cxValue - 25
        });

        //remove highlight from other nodes and add to the clicked node
        d3.selectAll(`.${styles.node}`).classed(styles.highlightNode, false);
        d3.select(eventCurrentTarget).select("circle").classed(styles.highlightNode, true);

        setNodeDetailModalVisible(prevState => {
            return !prevState;
        });
    }

    function removeHighlight() {
        d3.selectAll(`.${styles.highlightNode}`).classed(styles.highlightNode, false);
    }

    function formatLinks(links) {
        if (!links || !(links && links.length > 0)) {
            return [];
        }

        links.forEach((link, index) => {
            link.id = `link-${index}`;

            const same = links.filter((d) => d.source === link.target && d.target === link.source);
            const sameSelf = links.filter((d) => d.source === link.source && d.target === link.target);
            const all = sameSelf.concat(same);

            all.forEach((item, index) => {
                item.sameIndex = index + 1;
                item.sameTotal = all.length;
                item.sameTotalHalf = item.sameTotal / 2;
                item.sameUneven = item.sameTotal % 2 !== 0;
                item.sameMiddleLink = item.sameUneven === true && Math.ceil(item.sameTotalHalf) === item.sameIndex;
                item.sameLowerHalf = item.sameIndex <= item.sameTotalHalf;
                item.sameArcDirection = 1;
                item.sameIndexCorrected = item.sameLowerHalf ? item.sameIndex : item.sameIndex - Math.ceil(item.sameTotalHalf);
            });
        });

        const maxSame = links.concat().sort((a, b) => b.sameTotal - a.sameTotal)[0].sameTotal;

        links.forEach((link) => {
            link.maxSameHalf = Math.round(maxSame / 2);
        });

        return links;
    }

    function linkArc(d) {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        const unevenCorrection = d.sameUneven ? 0 : 0.5;
        const curvature = 2;
        let arc = (1.0 / curvature) * ((dr * d.maxSameHalf) / (d.sameIndexCorrected - unevenCorrection));

        if (d.sameMiddleLink) {
            arc = 0;
        }

        return `M${d.source.x},${d.source.y}A${arc},${arc} 0 0,${d.sameArcDirection} ${d.target.x},${d.target.y}`;
    }

    function splitText(text) {
        if (text.length <= 9) {
            return [text];
        } else if (text.length > 9 && text.length <= 17) {
            const middle = Math.ceil(text.length / 2);
            const before = text.slice(0, middle);
            const after = text.slice(middle);
            return [before, after];
        } else {
            const middle = Math.ceil(9);
            const before = text.slice(0, middle);
            const after = text.slice(middle, 17) + "...";
            
            return [before, after];
        }
    }

    useEffect(() => {
        ideas = ideas.filter((idea) => !idea[0].labels.some(label => !filterLabels.includes(label)));
        relations = relations.filter((relation) => !relation[0].labels.some(label => !filterLabels.includes(label)));

        relations = relations.filter((relation) => {
            const head = relation[0].neo4j_id;
            const tail = relation[2].neo4j_id;
            return ideas.some((idea) => idea[0].neo4j_id === head) && ideas.some((idea) => idea[0].neo4j_id === tail);
        });

        if (ideas.length === 0 || relations.length === 0) return;

        const svg = d3.select(svgRef.current);
        const g = d3.select(gRef.current);

        g.selectAll("*").remove();

        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("class", styles.arrowhead)
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 44)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5");

        const nodes = ideas.map((idea, index) => ({
            id: idea[0].neo4j_id,
            name: idea[0].name,
            x: generateCordset(ideas.length)[index][0],
            y: generateCordset(ideas.length)[index][1]
        }));

        const links = formatLinks(relations.map((relation) => ({
            source: relation[0].neo4j_id,
            target: relation[2].neo4j_id,
            type: relation[1].type
        })));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.id).distance(160))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(50, 25))
            .force("collision", d3.forceCollide().radius(55));

        const link = g.selectAll(".link")
            .data(links)
            .enter().append("g")
            .attr("class", "link");

        link.append("path")
            .attr("id", (d, i) => `linkPath${i}`)
            .attr("class", styles.link)
            .attr("marker-end", "url(#arrowhead)")
            .attr("d", linkArc);

        link.append("text")
            .attr("class", styles.linkLabel)
            .append("textPath")
            .attr("startOffset", "50%")
            .attr("text-anchor", "middle")
            .text((d) => d.type);

        const node = g.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .on("click", handleNodeClick);

        node.append("circle")
            .attr("class", d => `${styles.node} ${searchedNodes.includes(d.id) ? styles.highlightNode : ''}`)
            .attr("r", 20);

        node.append("text")
            .attr("class", styles.nodeLabel)
            .attr("text-anchor", "middle")
            .selectAll("tspan")
            .data(d => {
                const lines = splitText(d.name);
                const totalLines = lines.length;
                return lines.map((line, i) => ({
                    text: line,
                    lineIndex: i,
                    totalLines: totalLines
                }));
            })
            .enter().append("tspan")
            .attr("x", 0)
            .attr("dy", (d, i) => {
                if(d.totalLines === 1) return "0.4em";
                if(d.totalLines === 2) return i === 0 ? "-0.4em" : "1.3em";
            })
            .text(d => d.text);

        const drag = d3.drag()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });

        node.call(drag);

        simulation.on("tick", () => {
            link.select("path").attr("d", linkArc);

            node.attr("transform", (d) => `translate(${d.x},${d.y})`);

            link.select("textPath").attr("xlink:href", (d, i) => `#linkPath${i}`);
        });

        zoomRef.current
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoomRef.current);
        svg.on("click", removeHighlight);

    }, [ideas, relations, searchedNodes]);

    return (
        <>
            <svg className={styles.svg} ref={svgRef}>
                <g ref={gRef}>
                    {nodeDetailModalVisible && (
                        <foreignObject
                            x={modalPosition.left}
                            y={modalPosition.top}
                            width="300"
                            height="400"
                            className={styles.modalContainer}
                        >
                            <div ref={nodeDetailModalRef}>
                                <NodeDetailModal nodeWithDetail={selectedNode} />
                            </div>
                        </foreignObject>
                    )}
                </g>
            </svg>
        </>
    );
}

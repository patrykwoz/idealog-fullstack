'use client';

import { useEffect, useRef } from "react";
import * as d3 from "d3";

import styles from "./graph-canvas.module.css";

function generateCordset(count) {
    return Array(count)
        .fill(0)
        .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
}

export default function GraphCanvas({ ideas, relations }) {
    const svgRef = useRef(null);
    const gRef = useRef(null);

    useEffect(() => {
        if (ideas.length === 0 || relations.length === 0) return;

        const svg = d3.select(svgRef.current);
        const g = d3.select(gRef.current);

        // Clear previous graph elements
        g.selectAll("*").remove();

        const nodes = ideas.map((idea, index) => ({
            id: idea[0].name,
            name: idea[0].name,
            x: generateCordset(ideas.length)[index][0],
            y: generateCordset(ideas.length)[index][1]
        }));

        const links = relations.map((relation) => ({
            source: relation[0].name,
            target: relation[2].name,
            type: relation[1].type
        }));

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id((d) => d.id))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(50, 25));

        const link = g.selectAll(".link")
            .data(links)
            .enter().append("line")
            .attr("class", styles.link);

        const linkLabel = g.selectAll(".link-label")
            .data(links)
            .enter().append("text")
            .attr("class", styles.linkLabel)
            .text((d) => d.type);

        const node = g.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", styles.node)
            .attr("r", 10);

        const nodeLabel = g.selectAll(".node-label")
            .data(nodes)
            .enter().append("text")
            .attr("class", styles.nodeLabel)
            .text((d) => d.name.slice(0, 8));

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
            link
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);

            node
                .attr("cx", (d) => d.x)
                .attr("cy", (d) => d.y);

            nodeLabel
                .attr("x", (d) => d.x)
                .attr("y", (d) => d.y);

            linkLabel
                .attr("x", (d) => (d.source.x + d.target.x) / 2)
                .attr("y", (d) => (d.source.y + d.target.y) / 2);
        });

        const zoom = d3.zoom()
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoom);
    }, [ideas, relations]);

    return (
        <>
            <svg className={styles.svg}  ref={svgRef}>
                <g ref={gRef}></g>
            </svg>
        </>
    );
}

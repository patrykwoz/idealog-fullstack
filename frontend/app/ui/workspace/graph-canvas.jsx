// 'use client';

// import { useEffect, useRef } from "react";
// import * as d3 from "d3";
// import { useSidenav } from "./sidenav-context";
// import styles from "./graph-canvas.module.css";

// function generateCordset(count) {
//     return Array(count)
//         .fill(0)
//         .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
// }

// export default function GraphCanvas({ ideas, relations }) {
//     let { filterLabels, searchedNodes } = useSidenav();

//     const svgRef = useRef(null);
//     const gRef = useRef(null);

//     ideas = ideas.filter((idea) => !idea[0].labels.some(label => !filterLabels.includes(label)));
//     relations = relations.filter((relation) => !relation[0].labels.some(label => !filterLabels.includes(label)));

//     relations = relations.filter((relation) => {
//         const head = relation[0].name;
//         const tail = relation[2].name;
//         return ideas.some((idea) => idea[0].name === head) && ideas.some((idea) => idea[0].name === tail);
//     });

//     useEffect(() => {
//         if (ideas.length === 0 || relations.length === 0) return;

//         const svg = d3.select(svgRef.current);
//         const g = d3.select(gRef.current);

//         g.selectAll("*").remove();

//         const nodes = ideas.map((idea, index) => ({
//             id: idea[0].name,
//             name: idea[0].name,
//             x: generateCordset(ideas.length)[index][0],
//             y: generateCordset(ideas.length)[index][1]
//         }));

//         const links = relations.map((relation) => ({
//             source: relation[0].name,
//             target: relation[2].name,
//             type: relation[1].type
//         }));

//         const simulation = d3.forceSimulation(nodes)
//             .force("link", d3.forceLink(links).id((d) => d.id))
//             .force("charge", d3.forceManyBody().strength(-200))
//             .force("center", d3.forceCenter(50, 25));

//         const link = g.selectAll(".link")
//             .data(links)
//             .enter().append("line")
//             .attr("class", styles.link);

//         const linkLabel = g.selectAll(".link-label")
//             .data(links)
//             .enter().append("text")
//             .attr("class", styles.linkLabel)
//             .text((d) => d.type);

//         const node = g.selectAll(".node")
//             .data(nodes)
//             .enter().append("circle")
//             .attr("class", d => `${styles.node} ${searchedNodes.includes(d.name) ? styles.highlighNode : ''}`)
//             .attr("r", 10);

//         const nodeLabel = g.selectAll(".node-label")
//             .data(nodes)
//             .enter().append("text")
//             .attr("class", styles.nodeLabel)
//             .text((d) => d.name.slice(0, 10));

//         const drag = d3.drag()
//             .on("start", (event, d) => {
//                 if (!event.active) simulation.alphaTarget(0.3).restart();
//                 d.fx = d.x;
//                 d.fy = d.y;
//             })
//             .on("drag", (event, d) => {
//                 d.fx = event.x;
//                 d.fy = event.y;
//             })
//             .on("end", (event, d) => {
//                 if (!event.active) simulation.alphaTarget(0);
//                 d.fx = null;
//                 d.fy = null;
//             });

//         node.call(drag);

//         simulation.on("tick", () => {
//             link
//                 .attr("x1", (d) => d.source.x)
//                 .attr("y1", (d) => d.source.y)
//                 .attr("x2", (d) => d.target.x)
//                 .attr("y2", (d) => d.target.y);

//             node
//                 .attr("cx", (d) => d.x)
//                 .attr("cy", (d) => d.y);

//             nodeLabel
//                 .attr("x", (d) => d.x)
//                 .attr("y", (d) => d.y);

//             linkLabel
//                 .attr("x", (d) => (d.source.x + d.target.x) / 2)
//                 .attr("y", (d) => (d.source.y + d.target.y) / 2);
//         });

//         const zoom = d3.zoom()
//             .scaleExtent([0.5, 5])
//             .on("zoom", (event) => {
//                 g.attr("transform", event.transform);
//             });

//         svg.call(zoom);
//     }, [ideas, relations, searchedNodes]);

//     return (
//         <>
//             <svg className={styles.svg} ref={svgRef}>
//                 <g ref={gRef}></g>
//             </svg>
//         </>
//     );
// }

'use client';

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSidenav } from "./sidenav-context";
import styles from "./graph-canvas.module.css";

function generateCordset(count) {
    return Array(count)
        .fill(0)
        .map(() => [Math.random() * 80 + 10, Math.random() * 35 + 10]);
}

export default function GraphCanvas({ ideas, relations }) {
    let { filterLabels, searchedNodes } = useSidenav();

    // console.log('searchedNodes', searchedNodes);

    const svgRef = useRef(null);
    const gRef = useRef(null);
    const zoomRef = useRef(d3.zoom());

    ideas = ideas.filter((idea) => !idea[0].labels.some(label => !filterLabels.includes(label)));
    relations = relations.filter((relation) => !relation[0].labels.some(label => !filterLabels.includes(label)));

    relations = relations.filter((relation) => {
        const head = relation[0].name;
        const tail = relation[2].name;
        return ideas.some((idea) => idea[0].name === head) && ideas.some((idea) => idea[0].name === tail);
    });

    useEffect(() => {
        if (ideas.length === 0 || relations.length === 0) return;

        const svg = d3.select(svgRef.current);
        const g = d3.select(gRef.current);

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
            .attr("class", d => `${styles.node} ${searchedNodes.includes(d.name) ? styles.highlightNode : ''}`)
            .attr("r", 10);

        const nodeLabel = g.selectAll(".node-label")
            .data(nodes)
            .enter().append("text")
            .attr("class", styles.nodeLabel)
            .text((d) => d.name.slice(0, 10));

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

        zoomRef.current
            .scaleExtent([0.5, 5])
            .on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

        svg.call(zoomRef.current);
    }, [ideas, relations]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const g = d3.select(gRef.current);

        const matchedNodes = g.selectAll(".node")
            .filter(d => searchedNodes.includes(d.name));

        if (matchedNodes.empty()) return;

        const [[x0, y0], [x1, y1]] = matchedNodes.nodes().reduce((bounds, node) => {
            const bbox = node.getBBox();
            bounds[0][0] = Math.min(bounds[0][0], bbox.x);
            bounds[0][1] = Math.min(bounds[0][1], bbox.y);
            bounds[1][0] = Math.max(bounds[1][0], bbox.x + bbox.width);
            bounds[1][1] = Math.max(bounds[1][1], bbox.y + bbox.height);
            return bounds;
        }, [[Infinity, Infinity], [-Infinity, -Infinity]]);

        const dx = x1 - x0;
        const dy = y1 - y0;
        const x = (x0 + x1) / 2;
        const y = (y0 + y1) / 2;
        const scale = Math.max(0.5, Math.min(5, 0.9 / Math.max(dx / svgRef.current.clientWidth, dy / svgRef.current.clientHeight)));
        const transform = d3.zoomIdentity.translate(svgRef.current.clientWidth / 2, svgRef.current.clientHeight / 2).scale(scale).translate(-x, -y);

        svg.transition().duration(750).call(zoomRef.current.transform, transform);
    }, [searchedNodes]);

    return (
        <>
            <svg className={styles.svg} ref={svgRef}>
                <g ref={gRef}></g>
            </svg>
        </>
    );
}

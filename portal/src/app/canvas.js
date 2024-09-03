"use client";
import * as d3 from "d3";
import data from "@/../public/data/relations.json";

import { useRef, useEffect } from "react";

export default function Graph() {
	const svgRef = useRef(null);

	useEffect(() => {
		// Specify the dimensions of the chart.
		const width = "100svw";
		const height = "100svh";

		// Specify the color scale.
		const color = d3.scaleOrdinal(d3.schemeCategory10);

		// The force simulation mutates links and nodes, so create a copy
		// so that re-evaluating this cell produces the same result.
		const links = data.links.map((d) => ({ ...d }));
		const nodes = data.nodes.map((d) => ({ ...d }));

		// Create a simulation with several forces.
		const simulation = d3
			.forceSimulation(nodes)
			.force(
				"link",
				d3
					.forceLink(links)
					.id((d) => d.id)
					.distance(200)
			)
			.force("charge", d3.forceManyBody().strength(-100))
			.force("x", d3.forceX())
			.force("y", d3.forceY());

		// Create the SVG container.
		const svg = d3
			.select(svgRef.current)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("viewBox", [-window.screen.width / 2, -window.screen.height / 2, window.screen.width, window.screen.height])
			.attr("style", "max-width: 100%; max-height: 100%; border: 1px solid white;");

		// Add a line for each link, and a circle for each node.
		const link = svg
			.append("g")
			.attr("stroke", "#999")
			.attr("stroke-opacity", 1)
			.selectAll("line")
			.data(links)
			.join("line")
			.attr("stroke-width", (d) => Math.pow(d.value, 2));

		const node = svg
			.append("g")
			.attr("stroke", "#fff")
			.attr("stroke-width", 1.5)
			.selectAll("circle")
			.data(nodes)
			.join("g")
			.append("circle")
			.attr("r", 30)
			.attr("style", "width: 100%; height: auto; font: 10px sans-serif;")
			.attr("fill", (d) => color(d.group));

		const text = svg
			.selectChildren("g")
			.filter(function (d, i, list) {
				return i === list.length - 1;
			})
			.selectAll("g")
			.append("text")
			.text((d) => d.name)
			.attr("text-anchor", "middle")
			.attr("stroke", "#51c5cf")
			.attr("stroke-width", "0px")
			.attr("font-size", "10");

		// Add a drag behavior.
		node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

		// Set the position attributes of links and nodes each time the simulation ticks.
		simulation.on("tick", () => {
			link.attr("x1", (d) => d.source.x)
				.attr("y1", (d) => d.source.y)
				.attr("x2", (d) => d.target.x)
				.attr("y2", (d) => d.target.y);

			node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
			text.attr("x", (d) => d.x).attr("y", (d) => d.y);
		});

		// Reheat the simulation when drag starts, and fix the subject position.
		function dragstarted(event) {
			if (!event.active) simulation.alphaTarget(1).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		// Update the subject (dragged node) position during drag.
		function dragged(event) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		// Restore the target alpha so the simulation cools after dragging ends.
		// Unfix the subject position now that it’s no longer being dragged.
		function dragended(event) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		// When this cell is re-run, stop the previous simulation. (This doesn’t
		// really matter since the target alpha is zero and the simulation will
		// stop naturally, but it’s a good practice.)
		// invalidation.then(() => simulation.stop());
		// return svg.node();
	}, []);

	return <div ref={svgRef}></div>;
}

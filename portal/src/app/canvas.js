"use client";
import * as d3 from "d3";
import data from "@/data/relations.json";

import { useRef, useEffect } from "react";

export default function Graph({ currentUser, selectedFamily }) {
	const svgRef = useRef(null);

	useEffect(() => {
		// Clear previous SVG
		d3.select(svgRef.current).selectAll("*").remove();

		// Filter data based on current user (privacy mode)
		let filteredNodes = [...data.nodes];
		let filteredLinks = [...data.links];

		// Apply family filter
		if (selectedFamily !== "all") {
			filteredNodes = filteredNodes.filter(node => node.group === parseInt(selectedFamily));
			// Filter links to only include those between nodes in the selected family
			const nodeIds = new Set(filteredNodes.map(n => n.id));
			filteredLinks = filteredLinks.filter(link => {
				const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
				const targetId = typeof link.target === 'object' ? link.target.id : link.target;
				return nodeIds.has(sourceId) && nodeIds.has(targetId);
			});
		}

		// Apply privacy filter if a user is logged in
		if (currentUser) {
			const userId = parseInt(currentUser);
			const relatedNodeIds = new Set([userId]);
			
			// Find all directly connected nodes
			filteredLinks.forEach(link => {
				const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
				const targetId = typeof link.target === 'object' ? link.target.id : link.target;
				
				if (sourceId === userId) {
					relatedNodeIds.add(targetId);
				}
				if (targetId === userId) {
					relatedNodeIds.add(sourceId);
				}
			});

			// Filter nodes to only show related ones
			filteredNodes = filteredNodes.filter(node => relatedNodeIds.has(node.id));
			
			// Filter links to only show those between related nodes
			filteredLinks = filteredLinks.filter(link => {
				const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
				const targetId = typeof link.target === 'object' ? link.target.id : link.target;
				return relatedNodeIds.has(sourceId) && relatedNodeIds.has(targetId);
			});
		}

		// Specify the dimensions of the chart.
		// On mobile (width < 768px), sidebar is hidden, so use full width
		const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
		const width = isMobile ? window.innerWidth : window.innerWidth - 280; // Account for sidebar on desktop
		const height = window.innerHeight - 80; // Account for header

		// Enhanced color scale for better visual distinction
		const color = d3.scaleOrdinal()
			.domain([1, 2])
			.range(['#1f77b4', '#ff7f0e']);

		// The force simulation mutates links and nodes, so create a copy
		const links = filteredLinks.map((d) => ({ ...d }));
		const nodes = filteredNodes.map((d) => ({ ...d }));

		if (nodes.length === 0) {
			// Display a message if no nodes to show
			const svg = d3.select(svgRef.current)
				.append("svg")
				.attr("width", width)
				.attr("height", height);
			
			svg.append("text")
				.attr("x", width / 2)
				.attr("y", height / 2)
				.attr("text-anchor", "middle")
				.attr("font-size", "20px")
				.attr("fill", "#9ca3af")
				.text("No family members to display");
			
			return;
		}

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
			.force("charge", d3.forceManyBody().strength(-400))
			.force("center", d3.forceCenter(width / 2, height / 2))
			.force("collision", d3.forceCollide().radius(50));

		// Create the SVG container.
		const svg = d3
			.select(svgRef.current)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("style", "max-width: 100%; max-height: 100%;");

		// Add zoom behavior
		const g = svg.append("g");

		svg.call(d3.zoom()
			.scaleExtent([0.1, 4])
			.on("zoom", (event) => {
				g.attr("transform", event.transform);
			}));

		// Add relationship labels
		const linkGroup = g.append("g");
		
		const link = linkGroup
			.selectAll("line")
			.data(links)
			.join("line")
			.attr("stroke", "#9ca3af")
			.attr("stroke-opacity", 0.6)
			.attr("stroke-width", (d) => Math.sqrt(d.value) * 2);

		const linkText = linkGroup
			.selectAll("text")
			.data(links)
			.join("text")
			.text((d) => d.relationship || "")
			.attr("font-size", "10px")
			.attr("fill", "#6b7280")
			.attr("text-anchor", "middle");

		// Create node groups
		const node = g
			.append("g")
			.selectAll("g")
			.data(nodes)
			.join("g")
			.call(d3.drag()
				.on("start", dragstarted)
				.on("drag", dragged)
				.on("end", dragended));

		// Add circles for nodes with enhanced styling
		node.append("circle")
			.attr("r", 35)
			.attr("fill", (d) => color(d.group))
			.attr("stroke", "#fff")
			.attr("stroke-width", 3)
			.style("filter", "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))")
			.style("cursor", "pointer");

		// Add hover effect
		node.on("mouseenter", function() {
			d3.select(this).select("circle")
				.transition()
				.duration(200)
				.attr("r", 40)
				.attr("stroke-width", 4);
		})
		.on("mouseleave", function() {
			d3.select(this).select("circle")
				.transition()
				.duration(200)
				.attr("r", 35)
				.attr("stroke-width", 3);
		});

		// Add names inside circles
		node.append("text")
			.text((d) => d.name)
			.attr("text-anchor", "middle")
			.attr("dy", "0.35em")
			.attr("font-size", "11px")
			.attr("font-weight", "600")
			.attr("fill", "#fff")
			.style("pointer-events", "none")
			.each(function(d) {
				// Wrap text if too long
				const words = d.name.split(" ");
				if (words.length > 1) {
					d3.select(this).selectAll("tspan").remove();
					words.forEach((word, i) => {
						d3.select(this).append("tspan")
							.text(word)
							.attr("x", 0)
							.attr("dy", i === 0 ? "-0.3em" : "1.1em");
					});
				}
			});

		// Set the position attributes of links and nodes each time the simulation ticks.
		simulation.on("tick", () => {
			link
				.attr("x1", (d) => d.source.x)
				.attr("y1", (d) => d.source.y)
				.attr("x2", (d) => d.target.x)
				.attr("y2", (d) => d.target.y);

			linkText
				.attr("x", (d) => (d.source.x + d.target.x) / 2)
				.attr("y", (d) => (d.source.y + d.target.y) / 2);

			node.attr("transform", (d) => `translate(${d.x},${d.y})`);
		});

		// Reheat the simulation when drag starts, and fix the subject position.
		function dragstarted(event) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			event.subject.fx = event.subject.x;
			event.subject.fy = event.subject.y;
		}

		// Update the subject (dragged node) position during drag.
		function dragged(event) {
			event.subject.fx = event.x;
			event.subject.fy = event.y;
		}

		// Restore the target alpha so the simulation cools after dragging ends.
		// Unfix the subject position now that it's no longer being dragged.
		function dragended(event) {
			if (!event.active) simulation.alphaTarget(0);
			event.subject.fx = null;
			event.subject.fy = null;
		}

		return () => {
			simulation.stop();
		};
	}, [currentUser, selectedFamily]);

	return <div ref={svgRef} style={{ width: '100%', height: '100%' }}></div>;
}

Product Requirements Document (PRD)
Application: Dynastry
Feature: Creation of Individual Record / Node

1. Purpose
The purpose of this feature is to enable users to create individual records (nodes) in Dynastry, representing family members within an undirected graph structure. Each node will store personal information and establish relationships with other nodes in the family tree.

2. Background and Strategic Fit
Dynastry aims to provide a comprehensive platform for users to document and explore their genealogical history. The creation of individual records is fundamental to building and visualizing the family tree. This feature will support the application's goal of making family history accessible, interactive, and engaging.

3. Scope and Objectives
Objective: Allow users to create, edit, and manage individual records (nodes) within the family tree.
Scope: This feature includes user interfaces for record creation, backend logic for storing and retrieving data, and integration with the graph structure to establish relationships.
4. Requirements
4.1 Functional Requirements
Node Creation Interface

Users must be able to input personal information such as name, date of birth, place of birth, and other relevant details.
Users must be able to upload a profile picture for each individual record.
Data Fields

Mandatory fields: First Name, Last Name, Date of Birth, Gender.
Optional fields: Middle Name, Date of Death, Place of Birth, Biography, Profile Picture.
Relationship Management

Users must be able to define relationships (e.g., parent, child, sibling, spouse) between nodes.
The system should allow for multiple relationships to be established for each node.
Graph Integration

Each created node should automatically be integrated into the undirected graph structure.
Relationships should update the graph to reflect connections between nodes.
Data Validation

Ensure all mandatory fields are filled before creating a node.
Validate date formats and other input constraints.
User Feedback

Provide confirmation messages upon successful creation of a node.
Display error messages for invalid inputs or missing mandatory fields.
4.2 Non-Functional Requirements
Performance

Node creation and relationship updates should occur in real-time.
The system should handle concurrent node creation by multiple users efficiently.
Usability

The user interface should be intuitive and easy to navigate.
Provide tooltips and help texts for form fields to guide users.
Security

Ensure that personal data is securely stored and accessible only to authorized users.
Implement data encryption for sensitive information.
Scalability

The system should support an increasing number of nodes without performance degradation.
Optimize the graph database to handle complex family trees.
5. User Stories
As a user, I want to create a new individual record with personal information so that I can add a family member to my family tree.
As a user, I want to define relationships between individual records so that I can map out the connections in my family tree.
As a user, I want to edit the details of an existing individual record so that I can update information as needed.
6. Acceptance Criteria
Node Creation

Given valid inputs, when the user submits the form, then a new node should be created and integrated into the graph structure.
Relationship Definition

Given existing nodes, when the user defines a relationship, then the relationship should be visually represented in the family tree.
Data Validation

Given invalid inputs, when the user submits the form, then appropriate error messages should be displayed.
Performance

Given multiple simultaneous node creations, when the users submit the forms, then the system should handle the requests without significant delays.
7. Dependencies
Graph database for storing nodes and relationships.
Backend service for handling node creation and relationship updates.
Frontend framework for creating user interfaces.
8. Risks and Assumptions
Risks: Potential performance issues with a large number of nodes and relationships; data privacy concerns.
Assumptions: Users have basic computer literacy; internet connectivity for accessing the application.
Document Approval:

Product Manager: Varun
Development Lead: Varun
UI/UX Designer: Vasee
QA Lead: Varun
Date: 10-07-2024

This PRD outlines the fundamental requirements for creating individual records within Dynastry, ensuring a seamless and intuitive user experience while maintaining the integrity and scalability of the family tree application.








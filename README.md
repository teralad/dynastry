# Dynastry: A Tree-mendous Family Tree Adventure
### Project Description:

Dynastry is a tree-mendously intuitive and comprehensive family tree application designed to help individuals and families branch out and explore their genealogical history. Whether you're looking to preserve your family’s leafy legacy, connect with distant twigs, or get to the root of your ancestral roots, Dynastry offers a robust platform to visualize and manage your family's lineage.

Get ready to leaf through your family history with a smile and uncover the roots of your family tree, right down to the last acorn!

### Key Features:

- Person Management: Add detailed profiles for each family member, including personal information, photos, and important life events. It’s like a scrapbook but without the sticky glue and glitter mishaps!

- Relationship Mapping: Define and visualize relationships between family members, such as parents, children, siblings, spouses, and those nutty uncles and aunts. Watch your family tree grow without the need for water or sunlight!

- Interactive Family Tree: Create and explore an interactive family tree that dynamically displays connections and allows for easy navigation through generations. It's more fun than a barrel of genealogical monkeys!

- Search and Filter: Efficiently search for specific family members and filter the family tree based on various criteria, such as name, relationship, or significant dates. Perfect for finding that one branch that always seems to be hiding!

- Collaboration Tools: Invite family members to chip in and add their two cents (or roots). Share memories, compare notes, and collaboratively build an accurate and rich family history. It’s a family reunion without the awkward small talk!

- Data Privacy and Security: Ensure that all personal data and family history information are securely stored and accessible only to authorized users. Your secrets are safe as a squirrel’s winter stash!

- Historical Records Integration: Link historical documents and records to family members to provide a deeper context and enrich the family narrative. Because who doesn’t love a good old-fashioned paper trail?

#### Target Audience:

- Individuals interested in genealogy and preserving their family history.
- Families looking to document and share their collective heritage.
- Genealogists and historians conducting research on family lineages.

## Mission Statement:

At Dynastry, our mission is to help families dig up their roots and sow the seeds for future generations. We believe every family has a unique story to tell, and our goal is to provide the tools and platform to make those stories come alive, one branch at a time. We’re rooting for you every step of the way!

<br>

## Visual Overview: Family Tree Graph Structure

Dynastry uses an interactive graph visualization to display family relationships. Here's how the graph looks with various family connections:

### Complete Family Tree View
The graph displays all family members across multiple families with their relationships clearly labeled:

![Family Tree - All Families](https://github.com/user-attachments/assets/7d9bf743-6478-4a56-b1ab-3fdf4d08a9d4)

**Key Visual Elements:**
- **Nodes (Circles)**: Represent individual family members
- **Edges (Lines)**: Represent relationships between members
- **Labels**: Display the type of relationship (Spouse, Parent, Child, Sibling)
- **Colors**: Distinguish between different family groups (Blue = Family 1, Orange = Family 2)

### Relationship Types Supported

Dynastry supports four primary relationship types that form the foundation of family trees:

| Relationship Type | Description | Example |
|------------------|-------------|---------|
| **Spouse** | Marital relationship between two individuals | Grand Father ↔ Grand Mother |
| **Parent** | Parent-child relationship (directional) | Mom → Me |
| **Child** | Inverse of parent relationship | Me ← Mom |
| **Sibling** | Brother/sister relationship | Me ↔ Sister |

### Family Group Filtering
Filter the view to show only specific families:

![Family Tree - Family 1 Only](https://github.com/user-attachments/assets/4d10034a-1a15-4a44-bb0e-29a1929257b7)

### Privacy Mode
When logged in as a specific family member, the graph displays only directly related family members for enhanced privacy:

![Family Tree - Privacy Mode](https://github.com/user-attachments/assets/5546b122-9153-470b-ad03-35b41605ca2a)

**Privacy Features:**
- Shows only the logged-in user and their direct relationships
- Filters out unrelated family members
- Maintains data security while allowing collaboration

### Graph Structure Example

Here's a simplified representation of how relationships are structured in the graph:

```
Grand Father ──(Spouse)── Grand Mother
     │                         │
     ├────────(Parent)──────────┤
     │                         │
   Uncle                      Mom ──(Spouse)── Dad
     │                         │                 │
     │                         ├────(Parent)─────┤
     │                         │                 │
  Uncle Jr                    Me ──(Sibling)── Sister
```

### Interactive Features

The graph visualization includes:
- **Drag & Drop**: Click and drag nodes to rearrange the layout
- **Zoom & Pan**: Mouse wheel to zoom, click and drag background to pan
- **Hover Effects**: Nodes enlarge on hover for better visibility
- **Dynamic Layout**: Force-directed graph automatically organizes nodes for optimal viewing

<br>

## Contribution:

*We follow all the work done in dynastry in [notion](https://www.notion.so/Dynastry-6926911cc5db423596052fa88a5c03a4). Raise an issue in github or ask for an invite in discord if you are interested.*

#### Guidelines
- Code Quality: Ensure your code is well-documented and follows the project's coding standards.
- Testing: Include unit tests for any new features or bug fixes. Make sure all tests pass before submitting your pull request.
- Documentation: Update the documentation as needed to reflect your changes, including any new instructions, functions, or features.

#### Reporting Issues
If you find a bug or have a feature request, please create an issue on the GitHub repository. Provide as much detail as possible to help us understand and address the issue.

#### Community
Join the conversation by participating in discussions and providing feedback on issues and pull requests. We value and appreciate your input!


### P.S : I did it to live through time.

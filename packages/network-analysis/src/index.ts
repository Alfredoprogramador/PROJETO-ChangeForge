/**
 * ChangeForge Network Analysis
 *
 * Utilities for Organizational Network Analysis (ONA) graph computations.
 * In production these are backed by Neo4j queries.
 */

// ──────────────────────────────────────────────
// Graph Types
// ──────────────────────────────────────────────

export interface OrgNode {
  id: string;
  label: string;
  department: string;
  nodeType: 'influencer' | 'adopter' | 'resistant' | 'neutral';
  resistanceScore: number;   // 0–100
}

export interface OrgEdge {
  source: string;
  target: string;
  weight: number;            // 0–1 strength of influence
}

export interface OrgGraph {
  nodes: OrgNode[];
  edges: OrgEdge[];
}

// ──────────────────────────────────────────────
// Centrality Calculations (client-side helpers)
// ──────────────────────────────────────────────

/**
 * Compute degree centrality for each node.
 * Degree centrality = number of connections / (n - 1)
 */
export function degreeCentrality(graph: OrgGraph): Record<string, number> {
  const n = graph.nodes.length;
  if (n <= 1) return {};

  const degrees: Record<string, number> = {};
  graph.nodes.forEach((node) => {
    degrees[node.id] = 0;
  });

  graph.edges.forEach((edge) => {
    degrees[edge.source] = (degrees[edge.source] ?? 0) + 1;
    degrees[edge.target] = (degrees[edge.target] ?? 0) + 1;
  });

  const centralityMap: Record<string, number> = {};
  Object.entries(degrees).forEach(([id, deg]) => {
    centralityMap[id] = deg / (n - 1);
  });

  return centralityMap;
}

/**
 * Identify influencers: nodes with degree centrality above the threshold.
 */
export function identifyInfluencers(
  graph: OrgGraph,
  threshold = 0.3,
): OrgNode[] {
  const centrality = degreeCentrality(graph);
  return graph.nodes.filter((node) => (centrality[node.id] ?? 0) >= threshold);
}

/**
 * Identify resistance clusters: connected subgraphs where all members
 * have resistance score >= minResistance.
 */
export function identifyResistanceClusters(
  graph: OrgGraph,
  minResistance = 60,
): OrgNode[][] {
  const resistantNodes = new Set(
    graph.nodes
      .filter((n) => n.resistanceScore >= minResistance)
      .map((n) => n.id),
  );

  // Build adjacency for resistant nodes only
  const adjacency: Record<string, string[]> = {};
  resistantNodes.forEach((id) => (adjacency[id] = []));

  graph.edges.forEach((edge) => {
    if (resistantNodes.has(edge.source) && resistantNodes.has(edge.target)) {
      adjacency[edge.source]?.push(edge.target);
      adjacency[edge.target]?.push(edge.source);
    }
  });

  // BFS to find connected components
  const visited = new Set<string>();
  const clusters: OrgNode[][] = [];

  resistantNodes.forEach((startId) => {
    if (visited.has(startId)) return;

    const cluster: string[] = [];
    const queue = [startId];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;
      visited.add(current);
      cluster.push(current);
      adjacency[current]?.forEach((neighbor) => {
        if (!visited.has(neighbor)) queue.push(neighbor);
      });
    }

    if (cluster.length > 0) {
      const clusterNodes = cluster
        .map((id) => graph.nodes.find((n) => n.id === id)!)
        .filter(Boolean);
      clusters.push(clusterNodes);
    }
  });

  return clusters;
}

// ──────────────────────────────────────────────
// Neo4j Cypher query templates
// ──────────────────────────────────────────────

export const CYPHER_QUERIES = {
  /** Find top influencers by degree centrality */
  topInfluencers: `
    CALL gds.degree.stream('orgGraph')
    YIELD nodeId, score
    RETURN gds.util.asNode(nodeId).name AS name,
           gds.util.asNode(nodeId).department AS department,
           score AS degreeCentrality
    ORDER BY score DESC
    LIMIT 10
  `,

  /** Detect communities using Louvain algorithm */
  communityDetection: `
    CALL gds.louvain.stream('orgGraph')
    YIELD nodeId, communityId
    RETURN gds.util.asNode(nodeId).name AS name,
           gds.util.asNode(nodeId).resistanceScore AS resistanceScore,
           communityId
    ORDER BY communityId, resistanceScore DESC
  `,

  /** Find shortest path between two users (influence path) */
  influencePath: `
    MATCH (a:User {id: $sourceId}), (b:User {id: $targetId})
    CALL gds.shortestPath.dijkstra.stream('orgGraph', {
      sourceNode: a,
      targetNode: b,
      relationshipWeightProperty: 'weight'
    })
    YIELD path
    RETURN path
  `,
};

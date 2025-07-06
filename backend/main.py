from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, validator
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware
from config import config

app = FastAPI(
    title=config.API_TITLE,
    version=config.API_VERSION,
    description=config.API_DESCRIPTION
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.get_cors_origins(),
    allow_credentials=config.CORS_ALLOW_CREDENTIALS,
    allow_methods=config.CORS_ALLOW_METHODS,
    allow_headers=config.CORS_ALLOW_HEADERS,
)

class Node(BaseModel):
    id: str
    
    @validator('id')
    def validate_id(cls, v):
        if not v or not v.strip():
            raise ValueError('Node ID cannot be empty')
        return v.strip()

class Edge(BaseModel):
    id: str
    source: str
    target: str
    
    @validator('source', 'target')
    def validate_endpoints(cls, v):
        if not v or not v.strip():
            raise ValueError('Edge endpoints cannot be empty')
        return v.strip()

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    
    @validator('nodes')
    def validate_nodes(cls, v):
        if not v:
            raise ValueError('At least one node is required')
        return v

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    try:
        nodes = pipeline.nodes
        edges = pipeline.edges
        
        # Validate node IDs are unique
        node_ids = [node.id for node in nodes]
        if len(node_ids) != len(set(node_ids)):
            raise HTTPException(status_code=400, detail="Duplicate node IDs found")
        
        # Count ALL edges (including OutputsNode connections)
        num_nodes = len(nodes)
        num_edges = len(edges)
        
        # Filter out edges that reference nodes not in the nodes list (only for DAG processing)
        valid_node_ids = {node.id for node in nodes}
        filtered_edges = [edge for edge in edges if edge.source in valid_node_ids and edge.target in valid_node_ids]

        # Build adjacency list
        adj = {node.id: [] for node in nodes}
        for edge in filtered_edges:
            adj[edge.source].append(edge.target)

        # Cycle detection using DFS
        def is_dag():
            visited = set()
            rec_stack = set()

            def dfs(v):
                visited.add(v)
                rec_stack.add(v)
                for neighbor in adj.get(v, []):
                    if neighbor not in visited:
                        if dfs(neighbor):
                            return True
                    elif neighbor in rec_stack:
                        return True
                rec_stack.remove(v)
                return False

            for node in adj:
                if node not in visited:
                    if dfs(node):
                        return False
            return True

        return {
            'num_nodes': num_nodes,
            'num_edges': num_edges,
            'is_dag': is_dag()
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

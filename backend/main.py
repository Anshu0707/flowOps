from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    # other fields are ignored for DAG check

class Edge(BaseModel):
    id: str
    source: str
    target: str
    # other fields are ignored for DAG check

class PipelineRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelineRequest):
    nodes = pipeline.nodes
    edges = pipeline.edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build adjacency list
    adj = {node.id: [] for node in nodes}
    for edge in edges:
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

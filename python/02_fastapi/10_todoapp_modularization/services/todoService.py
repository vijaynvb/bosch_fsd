import json
from pathlib import Path
# business logic -> manage data from datastores for persisting and fetching
# static data source -> json file
# dynamic data source -> databases
# backend services -> REST API, GraphQL API, gRPC API
DB_PATH = Path(__file__).parent.parent / "db" / "todo.json"

def get_all_todos():
    with open(DB_PATH, "r", encoding="utf-8") as f:
        return json.load(f)
from fastapi import FastAPI

app = FastAPI()

# More endpoints will go here

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
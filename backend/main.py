from fastapi import FastAPI
import os
import dotenv
import httpx

dotenv.load_dotenv()
MEALDB_KEY = os.getenv("MEALDB_API_KEY", "1")
MEALDB_BASE = f"https://www.themealdb.com/api/json/v1/{MEALDB_KEY}"

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/areas")
async def list_areas():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MEALDB_BASE}/list.php", params=({"a": "list"}))
    return response.json()

@app.get("/areas/search")
async def search_areas(query: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MEALDB_BASE}/list.php", params=({"a": "list"}))
    areas = response.json().get("meals", [])    #list of all areas

    matches = [area for area in areas
               if query.lower() in area["strArea"].lower()]

    return {"matches": matches}
        
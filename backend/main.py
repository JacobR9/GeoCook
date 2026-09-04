from fastapi import FastAPI
import os
import dotenv
import httpx
from fastapi.middleware.cors import CORSMiddleware

dotenv.load_dotenv()
MEALDB_KEY = os.getenv("MEALDB_API_KEY", "1")
MEALDB_BASE = f"https://www.themealdb.com/api/json/v1/{MEALDB_KEY}"

app = FastAPI()

# setup CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.get("areas/{area}/meals")
async def get_meals(area: str):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{MEALDB_BASE}/filter.php", params=({"a": area}))
    meals = response.json().get("meals") or []  #[] if no meals
    return {"meals: meals"}
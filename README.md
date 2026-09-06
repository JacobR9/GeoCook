# GeoCook

**What's a country you've wanted to experience but haven't yet?**

Pick one. Get a real recipe from its cuisine, a few facts about the place, and a song to put on while you cook, all without booking a flight or hunting down a restaurant that might not even exist near you.

This is a small project born out of a simple idea: the easiest way to experience a culture from home isn't a travel blog, it's food. Cooking something authentic while learning a bit about where it came from, and hearing what people there might actually be listening to gets you closer to "being there" than scrolling photos ever will.

---

## How it works

1. **Pick a country** you're curious about
2. Get a **recipe** for a real dish from that cuisine, with full ingredients and instructions
3. While you cook, see a few **interesting facts** about the country
4. Press play on a **song** that fits, because good food deserves a soundtrack

No sign up needed. Just pick a place and start cooking.

---

## Why this exists

Restaurants serving a specific country's cuisine are often expensive, hard to find or simply don't exist where you live. This project is a small attempt to close that gap and turn a kitchen at home into a low effort passport stamp.

## Tech stack

- **Backend:** FastAPI (Python)
- **Frontend:** React
- **Recipe data:** [TheMealDB](https://www.themealdb.com/), called live, no local recipe database
- **Country data:** [REST Countries](https://restcountries.com/) for structured data (capital, region, languages, flag)
- **Music:** [Spotify](https://developer.spotify.com/documentation/web-api) track embeds for a one click listen while cooking
- **Curated content:** a small hand picked set of country facts and song pairings, chosen for tone rather than pulled from a generic trivia API, stored as static data so no database service is needed to run or demo the project
- **Deployment:** Vercel (frontend) and Railway or Render (backend)


## What this project actually adds

TheMealDB, REST Countries, and Spotify are all just data APIs. None of them know the others exist, and none are trying to build an experience. This project is the layer on top, combining recipe data, country context, and music into one cohesive cook and explore flow, with sensible fallbacks for countries that don't yet have recipe coverage.

## Coverage note

Recipe availability currently spans TheMealDB's supported cuisines (around 29 countries). Country facts and browsing work for any country via REST Countries, with a "recipes coming soon" state for the rest.

## Status

In active development, built as a personal project over roughly one month.

## Getting started

```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# add your MEALDB_API_KEY (and Spotify credentials, if used) to backend/.env
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

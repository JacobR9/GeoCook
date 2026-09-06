# Design Choices

This document records the reasoning behind key design decisions made while building GeoCook, particularly around the country search and selection flow. It is intended to capture the "why" behind choices that aren't obvious from the code alone.

-------------

## Country Search and Selection

### Dropdown of matching areas rather than a full button grid

Early planning considered displaying all available areas (or all search matches) as a grid or list of buttons for the user to click. This was rejected in favour of a live dropdown that appears beneath the search input as the user types.

**Reasoning:**
Displaying every available area as buttons does not scale well once the list of countries grows, and it front-loads visual clutter before the user has expressed any intent. A dropdown driven by live text input keeps the interface minimal by default and only surfaces options once the user is actively searching, which better matches how people expect a search field to behave (similar to search-as-you-type patterns used across most modern web interfaces). It also naturally supports partial and fuzzy input, since matches are filtered against both `strArea` and `strCountry`, so a search for "united" correctly surfaces "British" even though the area name itself doesn't contain that word.

### Selecting a result autofills the input rather than triggering a separate action button

Earlier iterations of the search flow displayed matches as clickable buttons that the user would press to trigger a separate "Submit" action and fetch recipes. This was reworked so that clicking a dropdown item autofills the search input with the selected country and immediately triggers the recipe fetch, with no intermediate button press required.

**Reasoning:**
Requiring a click on a result and then a separate click on a submit button introduces an unnecessary step for an action that only ever has one outcome, once a user has picked a country, there is no ambiguity about what should happen next. Collapsing selection and submission into a single click reduces friction and keeps the interaction closer to a single, continuous flow: type, see matches, pick one, see recipes. Autofilling the input also gives the user visible confirmation of what they selected, which a button-only interface does not provide as clearly.

### 500ms debounce on search input

Rather than firing a request to the backend on every keystroke, the search input is debounced so that a request is only sent once the user has paused typing for a set delay.

**Reasoning:**
Without debouncing, a six-letter search term would trigger six separate requests in rapid succession, the large majority of which are immediately superseded by the next keystroke before the user has even seen a response. This adds unnecessary load to the backend and, by extension, to TheMealDB's API, for no benefit to the user, who only cares about the result of their final input. Debouncing keeps API usage proportional to actual search intent rather than raw keystroke count, which matters given the aim of keeping the project lightweight and free-tier friendly throughout.

Beyond efficiency, debouncing also fixed a correctness issue observed during testing: without it, fast typing could trigger a search after only the first letter had registered, with subsequent keystrokes arriving after that request was already in flight, effectively skipping letters and searching on an incomplete or incorrect string. Waiting for a short pause in typing before firing the request ensures the search always reflects what the user actually intended to type, not just whatever had registered at the moment the request fired.

---

## Status

This document will be extended as further architectural and UX decisions are made throughout development.

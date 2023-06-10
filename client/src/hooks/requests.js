const API = "http://localhost:4005";

async function httpGetPlanets() {
  // Load planets and return as JSON.
  const resp = await fetch(`${API}/planets`);
  return await resp.json();
}

async function httpGetLaunches() {
  const resp = await fetch(`${API}/launches`);
  const data = await resp.json();
  return data.sort((a, b) => a.flightNumber - b.flightNumber);
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

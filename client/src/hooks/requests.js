const API = "http://localhost:4005/v1";

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
  // Submit given launch data to launch system.
  try {
    return await fetch(`${API}/launches`, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  // Delete launch with given ID.
  try {
    return await fetch(`${API}/launches/${id}`, {method:"DELETE"});
  } catch (e) {
    console.log(e);
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };

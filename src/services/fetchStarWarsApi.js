async function fetchPlanets() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  try {
    const resolve = await fetch(url);
    const data = await resolve.json();
    return data;
  } catch (err) {
    return err;
  }
}

export default fetchPlanets;

export async function getData(endpoint) {
  const {API_BASE} = process.env
  const data = await fetch(`${API_BASE}/${endpoint}`);
  return data.json()
}
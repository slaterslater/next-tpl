// data.js

export async function getData(endpoint, revalidate = 0) {
  const url = `${process.env.API_BASE}/${endpoint}`
  const data = await fetch(url, { next: { revalidate } });
  return data.json()
}
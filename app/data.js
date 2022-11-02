// data.js

// export async function getData(endpoint, revalidate = 0) {
export async function getData(endpoint) {
  const url = `${process.env.API_BASE}/${endpoint}`
  // const data = await fetch(url, { next: { revalidate } });
  const res = await fetch(url);
  const data = await res.json();
  return data
}
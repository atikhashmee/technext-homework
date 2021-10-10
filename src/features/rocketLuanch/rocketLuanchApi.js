function apple() {
  return 1;
}

async function fetchAllData() {
  const res = await fetch('https://api.spacexdata.com/v3/launches');
  return res.json();
}
export default fetchAllData;

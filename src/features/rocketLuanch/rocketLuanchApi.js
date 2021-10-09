/* eslint-disable linebreak-style */
/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
export async function fetchAllData() {
  const res = await fetch('https://api.spacexdata.com/v3/launches');
  return await res.json();
}

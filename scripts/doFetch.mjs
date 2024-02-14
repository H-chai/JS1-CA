// fetch Noroff API
export async function doFetch(url) {
  try {
    const response = await fetch (url);
    const data = await response.json();
    //console.log(data);
    return data;
  } catch(error) {
    console.error("Error fetching data:" + error);
    throw new Error(error);
  }
}

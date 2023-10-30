export const unsplashAccessKey = UNSPLASH_API_KEY;

export async function getApi(url) {
  let fetchResponse = await fetch(url);
  let result = await fetchResponse.json();
  return result;
}

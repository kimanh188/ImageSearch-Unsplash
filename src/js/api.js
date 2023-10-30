export const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

export async function getApi(url) {
  let fetchResponse = await fetch(url);
  let result = await fetchResponse.json();
  return result;
}

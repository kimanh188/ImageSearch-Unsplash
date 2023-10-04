export const unsplashAccessKey = "P4q-HQvojhih476NMAOCRW4FgYoP7xNjyoiU9PsgMP0";

export async function getApi(url) {
  let fetchResponse = await fetch(url);
  let result = await fetchResponse.json();
  return result;
}

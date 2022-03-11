export default async function api() {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const data = await fetch(
      "https://jsonplaceholder.typicode.com/photos/2",
      requestOptions
    );
    const result = await data.json();
    return result;
  } catch {
    return error;
  }
}

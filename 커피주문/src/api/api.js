export default async function api(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const data = await fetch(
      id
        ? ` https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products/${id}`
        : ` https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products`,
      requestOptions
    );
    const result = await data.json();
    return result;
  } catch {
    return error;
  }
}

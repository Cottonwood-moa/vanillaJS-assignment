export default async function api(id) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  try {
    const data = await fetch(
     id ?  `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/${id}` : `https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev`,
      requestOptions
    );
    const result = await data.json();
    return result;
  } catch {
    return error;
  }
}

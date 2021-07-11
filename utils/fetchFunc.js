const fetchFunc = async (url, options) => {
  try {
    const local = "https://6aaf23789fcf.ngrok.io/";
    const response = await fetch(`${local}${url}`, {
      ...options,
    });
    const parsedResponse = await response.json();
    return parsedResponse;
  } catch (err) {
    return { err: "something went wrong" };
  }
};

export default fetchFunc;

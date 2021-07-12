const fetchFunc = async (url, options) => {
  try {
    const local =
      "https://6aaf23789fcf.ngrok.io/"; /*here I used ngrok (ngrok allows me to expose a web server running on my local machine), so I can send requests to local servers from my mobile device*/
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

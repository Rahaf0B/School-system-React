export const fetchData = async () => {
  try {
    //get the data and put it on object
    const res = await fetch("http://localhost:1337/api/students");
    const json = await res.json();
    console.log("res", json);
    return json;
  } catch (error) {
    console.error(error);
    return error;
  }
};

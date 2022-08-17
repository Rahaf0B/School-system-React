import axios from "axios";

export const geInputPropsForTextField = (name) => {
  switch (name) {
    case "st_id":
      return {
        disabled: true,
        type: "number",
        name: name.split("_")[1].toUpperCase(),
        placeholder: "ex:120352",
      };
    case "st_name":
      return {
        disabled: true,
        type: "text",
        name: name.split("_")[1].toUpperCase(),
        placeholder: "ex:rahaf",
      };
    case "st_Email":
      return {
        disabled: false,
        type: "text",
        name: name.split("_")[1].toUpperCase(),
        placeholder: "ex:ex@gmail.com",
      };
    case "st_avg":
      return {
        disabled: true,
        type: "number",
        name: name.split("_")[1].toUpperCase(),
        placeholder: "ex:5",
      };

    case "st_registerDate":
      return {
        disabled: false,
        type: "text",
        name: name.split("_")[1].toUpperCase(),
        placeholder: "ex:YY-MM-DD",
      };

    case "st_register":
      return {
        disabled: false,
        type: "text",
        name: name.split("_")[1].toUpperCase(),
        placeholder: "ex:true/false",
      };

    default:
      return {
        disabled: false,
        type: "text",
        name,
      };
  }
};

export const getData = async () => {
  try {
    const response = await fetch(
      "http://localhost:1337/api/students?populate=*"
    ); //
    const data = await response.json();

    console.log("adadadadadadasdsssssssssssssssssssss");
    console.log(data.data[0].id);
    return [data.data, data.data[0].id, null];
  } catch (error) {
    return [null, null, error];
  }
};

export const deleteData = async (ID) => {
  let isError = null;

  fetch(`http://localhost:1337/api/students/${ID}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("HTTP request successful");
      } else {
        console.log("HTTP request unsuccessful");
      }
      return res;
    })
    .then((res) => res.json())
    .then((data) => "")
    .catch((error) => (isError = error));
  if (isError) {
    alert("there is an error occurred");
  } else {
    alert("The data has been deleted successful");
  }
};

export const getSingleData = async (ID) => {
  const linkId = window?.location?.href.split("/");
  try {
    const response = await axios.get(
      `http://localhost:1337/api/students/${ID}` //?populate=*
    ); //
    // const data = await response.json();
    return [response, null];
  } catch (error) {
    return [null, error];
  }
};

export const UpdatedData = async (KeyOfData, InputVlaue, ID) => {
  let k = KeyOfData;
  if (Object.values(InputVlaue).includes(null)) {
    alert("You must fill all the fields");
  } else {
    const data = { data: InputVlaue };

    fetch(`http://localhost:1337/api/students/${ID}`, {
      method: "put", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        ("");
      })
      .catch((error) => {
        if (error) {
          alert("there is an error acqure");
        }
      });
    alert("The Data has been updated");
  }
};
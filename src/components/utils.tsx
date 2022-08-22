import axios from "axios";

export const getInputPropsForTextField = (name) => {
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
        name: "register Date",
        placeholder: "ex:YY-MM-DD",
      };
    case "st_register":
      return {
        disabled: false,
        type: "checkbox",
        name: name.split("_")[1].toUpperCase(),
        placeholder: "ex:yes/no",
      };
    case "First Mark":
      return {
        id: "FirstMark",
        name,
        placeholder: name,
        type: "number",
      };
    case "Second Mark":
      return {
        id: "SecondMark",
        name,
        placeholder: name,
        type: "number",
      };
    case "Third Mark":
      return {
        id: "ThirdMark",
        name,
        placeholder: name,
        type: "number",
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
    return [data.data, data.data[0].id, null];
  } catch (error) {
    alert("there is an error occurred");
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

export const UpdatedData = async (inputValue, ID) => {
  if (Object.values(inputValue).includes(null)) {
    alert("You must fill all the fields");
  } else {
    const data = { data: inputValue };

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
          alert("there is an error occurred");
        }
      });
    alert("The Data has been updated");
  }
};

export const AddData = async (event, inputValues) => {
  if (Object.values(inputValues).includes(null)) {
    alert("You must fill all the fields");
  } else {
    event.preventDefault();
    fetch("http://localhost:1337/api/students", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data: inputValues }),
    })
      .then((res) => {
        return res;
      })
      .then((res) => res.json())
      .then((data) => "")
      .catch((error) => alert("there is an error occurred"));
    alert("The Data has been added");
  }
};

export const calculateMarksAverage = (Marks) => {
  let value = 0;
  Object.values(Marks).map((val: number) => {
    value = Number(val) + value;
  });
  const average =( value / Object.keys(Marks).length).toFixed(1);;
  
  return average;
};

export const updateImage = (imageDataToUpdate, ID) => {
  const imageData = imageDataToUpdate;
  let imageUpdate = { data: { st_image: imageData } };

  fetch(`http://localhost:1337/api/students/${ID}?populate=*`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(imageUpdate),
  })
    .then((response) => response.json())
    .then((data) => {
      ("");
    })
    .catch((error) => {
      alert("there is an error occurred");
    });
};

export const UploadImage = async (file) => {
  const data = new FormData();
  data.append("files", file);
  const upload_res = await axios({
    method: "POST",
    url: "http://localhost:1337/api/upload/",
    data,
  });
  const importedImageData = upload_res.data;
  const idStudent = importedImageData[0].id;
  delete importedImageData[0].id;
  const imageAttributes = Object.assign({}, importedImageData);
  imageAttributes["attributes"] = imageAttributes[0];
  delete imageAttributes[0];
  imageAttributes["id"] = idStudent;

  return imageAttributes;
};

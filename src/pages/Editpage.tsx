import React from "react";

import { useTable } from "react-table";
import axios from 'axios';
class Editclass extends React.Component<any, any> {
  state = {
    data: [],
    error: null,
    stu_id: null,
    canIdet:null
  };
   componentDidMount=async()=> {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/students/${this.state.stu_id}`
      ); //
      // const data = await response.json();

      this.setState({ data: response.data.data });
    } catch (error) {
      this.setState({ error });
    }
  }

  renderInputEdit() {
    const row_data = [
      {
        key: "",
        display: "value",
        isHidden: false,
      },
    ];
    let dataArrObj = []
 dataArrObj=Object.values(this.state.data? this.state.data:[{}]);
// dataArrObj=Object.entries(dataArrObj[0]? dataArrObj[0]:[{}]);
let objdata=dataArrObj[1];
// console.log(Object.keys(objdata))


console.log(dataArrObj)
console.log("dfs2222222222222sssssssss")
 dataArrObj=Object.entries(dataArrObj[1]? dataArrObj[1]:[{}]);
 console.log(dataArrObj)
 dataArrObj=Object.values(dataArrObj).filter(function (f) {
  return (

    f [0]!== "createdAt" &&
    f[0] !== "updatedAt" &&
    f[0] !== "publishedAt" &&
    f[0] !== "locale" &&
    f[0] !== "localizations"
  );
});


console.log(dataArrObj)

return dataArrObj.map((data: any, index) => {
    console.log(data)
  //  let keysofData=Object.keys(data).filter(function (f) {
  //   return (
  //     f !== "createdAt" &&
  //     f !== "updatedAt" &&
  //     f !== "publishedAt" &&
  //     f !== "locale" &&
  //     f !== "localizations"
  //   );
  // });
  console.log("ssgeeeeeeeeeeeeeeeeeeeeeeeeeeeeeehhhhhhhhhhhhhssssssssssssssssssssssssssssssss")

  console.log(data)
let keysofData=data.map((key:any) =>{
  console.log(key[0])
  return  key[0]
})
console.log("sfdszassssshhhhhhhhhhhhhhhhhhssssssssssssssssssssssssssssssss")
  console.log(keysofData)

  // for (let i = 0; i < keysofData.length; i++) {
  //   row_data.push({
  //     key: keysofData[i],
  //     display: data?.attributes[keysofData[i]],
  //     isHidden: true,
  //   });
  // }
      return (

      <input type="text" name="name" />

      );
      
      
      
     
    });
  }
  render() {
    console.log(this.state.data);
    console.log(window.location.href);
    const linkId = window.location.href.split("/");
    this.state.stu_id = linkId.at(-1);
    console.log(linkId.at(-1));
    console.log(`http://localhost:1337/api/students/${this.state.stu_id}`);

    return (
      <div>
        <br></br>
        <br></br>
        {this.renderInputEdit()}
      </div>
    );
  }
}

export default Editclass;

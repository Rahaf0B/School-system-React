import React from "react";
import { useTable } from "react-table";
import { fetchData } from "../GetStrapiData/GetData";
import { useEffect } from "react";
import SearchClass from "../components/Searchbar";


import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'


import { BooleanInput  } from 'react-admin';

import { Fragment}  from 'react'
class HomeClass extends React.Component<any, any> {
 
 
  state = {
    data: [],
    error: null,
    value_input: null,
    StudentID: null,
    isOpen:null,
    
  };

  value_input = null;
  getData = (val: any) => {
    this.setState({ value_input: val });
  };

  handleClickDelete = async (event, ID) => {
    console.log(ID);
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
      .then((data) => console.log(data))
      .catch((error) => this.setState({ error }));
  };

  async componentDidMount() {
    try {
      const response = await fetch(
        "http://localhost:1337/api/students?populate=*"
      ); //
      const data = await response.json();

      this.setState({ data: data.data });
      console.log("adadadadadadasdsssssssssssssssssssss");
      console.log(data.data[0].id);

      this.setState({ StudentID: data.data[0].id });
    } catch (error) {
      this.setState({ error });
    }
  }
 closeModal=()=>{
  this.setState({isOpen:false});
      
    }
  
   openModal=() =>{
    
   this.setState({isOpen:true});
    }
  
  renderTableHeader() {
    const column = [
      {
        key: "",
        display: "Name",
        isHidden: false,
      },
    ];
    return this.state.data.slice(0, 1).map((data: any, index) => {
      // console.log(Object.entries(data))

      // let FindData=Object.values(data.attributes).filter(stu=>{
      // if (this.value_input!==null){
      //   return stu
      // }

      // })

      let keys_att = Object.keys(data?.attributes).filter(function (f) {
        return (
          f !== "createdAt" &&
          f !== "updatedAt" &&
          f !== "publishedAt" &&
          f !== "locale" &&
          f !== "localizations"
        );
      });

      for (let i = 0; i < keys_att.length; i++) {
        column.push({
          key: keys_att[i],
          display: keys_att[i].split("_")[1].toUpperCase(),
          isHidden: true,
        });
      }

      column.shift();
      return (
        <tr key={keys_att[index]}>
          {column.map((cl) => (
            <th key={cl.key} scope="col">
              {cl.display}
            </th>
          ))}
          <th>Action</th>
        </tr>
      );
    });
  }

  renderTableData() {
    const row_data = [
      {
        key: "",
        display: "value",
        isHidden: false,
      },
    ];

    return this.state.data.map((data: any, index) => {
      let btn_hidden = false;
      let dilogHidden = true;
      row_data.length = 0;

      let keys_att = Object.keys(data?.attributes);

      let htmltag = [];

      keys_att = keys_att.filter(function (f) {
        return (
          f !== "createdAt" &&
          f !== "updatedAt" &&
          f !== "publishedAt" &&
          f !== "locale" &&
          f !== "localizations"
        );
      });

      var dataToDisplay = Object.values(data?.attributes);

    let colData;
      if (
        this.state.value_input == "" ||
        this.state.value_input == null ||
        data?.attributes?.st_name == this.state.value_input
      ) {
        btn_hidden = true;
        for (let i = 0; i < keys_att.length; i++) {
          if (keys_att[i] == "st_image") {
            console.log("dfghjkljhgfhjk",data?.attributes[keys_att[i]].data?.attributes?.url)
            colData=data?.attributes[keys_att[i]].data?.attributes?.url
            dilogHidden = true;
          } else {
            dilogHidden = false;
            colData=data?.attributes[keys_att[i]];
          }
          row_data.push({
            key: keys_att[i],
            display:  colData,
            isHidden: dilogHidden,
          });
        }
      }
      console.log("444444444444444444444",row_data)
      console.log("22222222222222222222222222",data?.attributes)

      return (
        <tr key={keys_att[index]}>
          {row_data.map((cl) => (
            <td key={cl.key}>
              

              {cl.isHidden ? (
                <div>
                  
                <button className="ta-button image" onClick={this.openModal}>Show Image</button>
               
<Dialog open={this.state?.isOpen? true:false}
onClose={this.closeModal}
aria-labelledby='dialog-title'
aria-describedby='dialog-description'>

<DialogTitle id='dialog-title'>Student Image</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description'>
          <img className="studend-img" src={`http://localhost:1337${cl.display}`}>
          </img>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={this.closeModal} autoFocus>
            Close
          </Button>
        </DialogActions>
</Dialog>
  </div>

              ) : <div>
       
                {cl.display?.toString()}
                
             
                </div>
                }
            
            
            </td>





          ))}
          {btn_hidden ? (
            <td key={keys_att[index] + "td"}>
              <div className="div-button">
                <a key={keys_att[index] + "Edit"} href={`/Edit/${data?.id}`}>
                  <button
                    key={keys_att[index]}
                    className="ta-button"
                    type="button"
                  >
                    Edit
                  </button>
                </a>
                <a key={keys_att[index] + "Delete"} href={"/"}>
                  <button
                    className="ta-button"
                    type="button"
                    onClick={(e) => this.handleClickDelete(e, data?.id)}
                  >
                    Delete
                  </button>
                </a>
              </div>
            </td>
          ) : null}
        </tr>
      );
    });
  }

  render() {
    if (this.state.error) {
      <div>{this.state.error}</div>;
    }
    return (
      <div className="container">
        <SearchClass sendData={this.getData} />
        <div className="div-add-btn">
          <h3 className="h3-add-stu">Add new student:</h3>

          <a href={"/AddNewStudent/"}>
            <button className="ta-button" type="button">
              Add
            </button>
          </a>
        </div>
        <table className="table table-sm">
          <tbody id="t-body">
            {this.renderTableHeader()}

            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HomeClass;

import React from "react";

import { useTable } from "react-table";
import axios from "axios";
class Editclass extends React.Component<any, any> {
  state = {
    data: [],
    error: null,
    stu_id: null,
    canIdet: null,
    message: null,
  };
  componentDidMount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/students/${this.state.stu_id}`
      ); //
      // const data = await response.json();

      this.setState({ data: response?.data?.data });
    } catch (error) {
      this.setState({ error });
    }
  };

  handleChange = (event) => {
    this.setState({ message: event.target.value });
    console.log("value........", event.target.value);
  };
  handleClick = (event) => {
    event.preventDefault();

    // 👇️ value of input field
    console.log("Click.............", this.state.message);
  };

  renderInputEdit() {
    const row_data = [
      {
        key: "",
        display: "value",
        isHidden: false,
      },
    ];
    let dataArrObj = [];
    dataArrObj = Object.values(this.state.data ? this.state.data : [{}]);

    dataArrObj = Object.entries(dataArrObj[1] ? dataArrObj[1] : [{}]);

    dataArrObj = Object.values(dataArrObj)?.filter(function (f) {
      return (
        f[0] !== "createdAt" &&
        f[0] !== "updatedAt" &&
        f[0] !== "publishedAt" &&
        f[0] !== "locale" &&
        f[0] !== "localizations"
      );
    });

    return dataArrObj?.map((data: any, index) => {
      let keysofData = data[0];

      row_data.push({
        key: keysofData,
        display: data[1],

        isHidden: true,
      });

      if (row_data[0].key === "") {
        row_data.shift();
      }

      return (
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
          value={this.state.message?this.state.message:""}
        />
      );
    });
  }
  render() {
    const linkId = window?.location?.href.split("/");
    this.state.stu_id = linkId.at(-1);

    return (
      <div>
        <br></br>
        <br></br>
        {this.renderInputEdit()}
        <button className="ta-button" onClick={this.handleClick}>
          ADD
        </button>
      </div>
    );
  }
}

export default Editclass;

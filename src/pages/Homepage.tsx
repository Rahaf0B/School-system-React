import React from "react";
import { useTable } from "react-table";
import { fetchData } from "../GetStrapiData/GetData";
import { useEffect } from "react";
import SearchClass from "../components/Searchbar";
class HomeClass extends React.Component<any, any> {
  state = {
    data: [],
    error: null,
    value_input: null,
    btn_hidden: false,
  };

  value_input = null;
  getData = (val: any) => {
    this.setState({ value_input: val });
  };
  async componentDidMount() {
    try {
      const response = await fetch(
        "http://localhost:1337/api/students?populate=*"
      ); //
      const data = await response.json();

      this.setState({ data: data.data });
    } catch (error) {
      this.setState({ error });
    }
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
        <tr>
          {column.map((cl) => (
            <th scope="col">{cl.display}</th>
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
      this.state.btn_hidden = false;
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

      if (
        this.state.value_input == "" ||
        this.state.value_input == null ||
        data?.attributes?.st_name == this.state.value_input
      ) {
        this.state.btn_hidden = true;
        for (let i = 0; i < keys_att.length; i++) {
          row_data.push({
            key: keys_att[i],
            display: data?.attributes[keys_att[i]],
            isHidden: true,
          });
        }
      }

      return (
        <tr key={data?.id}>
          {row_data.map((cl) => (
            <td>{cl.display.toString()}</td>
          ))}
          {this.state.btn_hidden ? (
            <td>
              <a href={`/Edit/${data?.id}`}>
                <button className="ta-button" type="button">
                  Edit
                </button>
              </a>
            </td>
          ) : null}
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <SearchClass sendData={this.getData} />

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

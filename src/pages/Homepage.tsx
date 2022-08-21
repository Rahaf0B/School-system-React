import React from "react";
import SearchClass from "../components/Searchbar";
import { getData } from "../components/utils";
import { deleteData } from "../components/utils";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

class HomePage extends React.Component<any, any> {
  state = {
    data: [],
    error: null,
    valueInputToSearch: null,
    StudentID: null,
    dialogIsOpen: null,
    startNumberOfItems: 0,
    endNumberOfItem: 5,
    numberOfItemsPerPage: 5,
    countOfData: 0,
  };

  valueInputToSearch = null;
  getData = (val: any) => {
    this.setState({ valueInputToSearch: val });
  };

  handleClickDelete = async (event, ID) => {
    deleteData(ID);
  };

  async componentDidMount() {
    const [studentData, studentId, error] = await getData();
    this.setState({ data: studentData });
    this.setState({ StudentID: studentId });
    this.setState({ error: error });
    const lengthOfData = studentData.length;
    this.setState({ countOfData: lengthOfData });
  }

  closeModal = () => {
    this.setState({ dialogIsOpen: false });
  };

  openModal = () => {
    this.setState({ dialogIsOpen: true });
  };

  renderTableHeader() {
    const column = [
      {
        key: "",
        display: "Name",
        isHidden: false,
      },
    ];
    return this.state.data.slice(0, 1).map((data: any, index) => {
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

  handleNextClick = () => {
    const count = this.state.endNumberOfItem;
    const countNextItem =
      this.state.endNumberOfItem + this.state.numberOfItemsPerPage; //this.state.numberOfItemsPerPage*2;
    if (this.state.endNumberOfItem < this.state.countOfData) {
      this.setState({ startNumberOfItems: count });
      this.setState({ endNumberOfItem: countNextItem });
    }
  };

  handleBackClick = () => {
    const count =
      this.state.startNumberOfItems - this.state.numberOfItemsPerPage;
    const countNextItem =
      this.state.endNumberOfItem - this.state.numberOfItemsPerPage;
    if (this.state.startNumberOfItems > 0) {
      this.setState({ startNumberOfItems: count });
      this.setState({ endNumberOfItem: countNextItem });
    }
  };

  renderTableData() {
    const row_data = [
      {
        key: "",
        display: "value",
        isHidden: false,
      },
    ];
    return this.state.data
      .slice(this.state.startNumberOfItems, this.state.endNumberOfItem)
      .map((data: any, index) => {
        let btn_hidden = false;
        let dialogIsHidden = true;
        row_data.length = 0;
        let keys_att = Object.keys(data?.attributes);
        keys_att = keys_att.filter(function (f) {
          return (
            f !== "createdAt" &&
            f !== "updatedAt" &&
            f !== "publishedAt" &&
            f !== "locale" &&
            f !== "localizations"
          );
        });
        let colData;
        const newFill1 = Array(7).fill("");
        colData = newFill1;
        if (
          this.state.valueInputToSearch == "" ||
          this.state.valueInputToSearch == null ||
          data?.attributes?.st_name == this.state.valueInputToSearch
        ) {
          btn_hidden = true;
          let count = 0;
          for (let i = 0; i < keys_att.length; i++) {
            if (keys_att[i] == "st_image") {
              count = count + 1;
              colData[i] = data?.attributes[keys_att[i]].data?.attributes?.url;
              dialogIsHidden = true;
            } else {
              dialogIsHidden = false;
              colData[i] = data?.attributes[keys_att[i]];
            }
            row_data.push({
              key: keys_att[i],
              display: colData[i],
              isHidden: dialogIsHidden,
            });
          }
        }
        return (
          <tr key={keys_att[index]}>
            {row_data.map((cl) => (
              <td key={cl.key}>
                {cl.isHidden ? (
                  <div className="div-show-image">
                    <button
                      className="ta-button image"
                      onClick={this.openModal}
                    >
                      Show Image
                    </button>
                    <Dialog
                      open={this.state?.dialogIsOpen ? true : false}
                      onClose={this.closeModal}
                      aria-labelledby="dialog-title"
                      aria-describedby="dialog-description"
                    >
                      <DialogTitle id="dialog-title">Student Image</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="dialog-description">
                          <img
                            className="studend-img"
                            src={`http://localhost:1337${cl.display}`}
                          ></img>
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.closeModal} autoFocus>
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                ) : (
                  <div>{cl.display?.toString()}</div>
                )}
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
            <button className="ta-button" id="ta-button-add" type="button">
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
        <div className="div-Paging-table">
          <button
            className="ta-button"
            id="ta-button-add"
            type="button"
            onClick={this.handleBackClick}
          >
            Previous
          </button>
          <button
            className="ta-button"
            id="ta-button-add"
            type="button"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;

import React from "react";
import TextFiledForMarks from "../components/TextFiledForMarks";
import { calculateMarksAverage } from "../components/utils";
import { UpdatedData } from "../components/utils";

class EditMarkPage extends React.Component {
  state = {
    textInput: {},
    stu_id: null,
  };

  componentDidMount = async () => {
    const inputName = { "First Mark": "", "Second Mark": "", "Third Mark": "" };
    this.setState({ textInput: inputName });
    const linkId = window?.location?.href.split("/");
    this.setState({
      stu_id: linkId.at(-1),
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const average = calculateMarksAverage(this.state.textInput);
    const studentMarksAverage = {
      st_avg: average,
    };

    UpdatedData(studentMarksAverage, this.state.stu_id);
  };

  handleChange = (event, key) => {
    const newValue = this.state.textInput;
    newValue[key] = event.target.value;
    this.setState({ textInput: newValue });
  };

  renderInputMarks() {
    return Object.entries(this.state?.textInput).map(([key]) => {
      return <TextFiledForMarks handlerEvent={this.handleChange} name={key} />;
    });
  }
  render() {
    return (
      <div className="div-from-marks-page">
        <div className="div-from-marks">
        <form className="form-marks" onSubmit={this.handleSubmit}>
          <h3 className="div-heading mark-heading">Edit the student marks</h3>
          <div className="div-input-marks">{this.renderInputMarks()}</div>

          <div className="div-button-avg">
         
            <button className="ta-button mark-button">
              Update Marks and the Average
            </button>
           
          </div>
         
        </form>
        <div className="div-button-home-page">
        <a href={"/"}>
            <button className="ta-button mark-button-home-page">
                Back to Home PAGE
            </button>

            </a>
            </div>
            </div>
      </div>
    );
  }
}

export default EditMarkPage;

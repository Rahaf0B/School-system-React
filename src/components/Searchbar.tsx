import React from "react";
class SearchBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.reset();
  }
  reset() {
    this.state = {
      inputValue: "",
    };
  }
  render() {
    return (
      <div className="container">
        <div className="b-search">
          <h4 className="h4-input">Search The Table By Using Student ID:</h4>
          <input
            value={this.state.inputValue}
            id="input-search"
            type="text"
            placeholder="Search here"
            onKeyUp={this.handleKey.bind(this)}
            onChange={(evt) => this.updateInputValue(evt)}
          ></input>
        </div>
      </div>
    );
  }
  handleKey(e: any) {
    if (e.key === "Enter") {
      this.props.sendData(this.state.inputValue);
    }
  }
  updateInputValue = (evt: any) => {
    const value = evt.target.value;

    this.setState({
      inputValue: value,
    });
  };
}

export default SearchBar;

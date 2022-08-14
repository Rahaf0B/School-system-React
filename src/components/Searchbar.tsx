import React from "react";
import { useTable } from "react-table";
import { useEffect } from "react";
class SearchClass extends React.Component<any, any> {
    constructor(props:any) {
        super(props);
        this.reset();
      }
    
      reset() {
        this.state = {
          inputValue: ''
        };
      }

    render() {
         
        return (
            <div className="container" >
            <div className="b-search">
            <h4 className="h4-input">Search the table by using student name:</h4>
            <input
            value={this.state.inputValue}
              id="input-search"
              type="text"
              placeholder="Search here"
              onKeyUp={this.handleKey.bind(this)}
              onChange={evt => this.updateInputValue(evt)}
            ></input>
   
          </div>
          </div>
        );
    }
    handleKey(e:any) {
        if (e.key === "Enter") {
          console.log("Enter key pressed");
          console.log(this.state.inputValue);
          this.props.sendData(this.state.inputValue)
        }
      }
    updateInputValue=(evt:any)=> {
      const val = evt.target.value;
      // ...       
      this.setState({
        inputValue: val
      });

      console.log(val)
    }


}


export default SearchClass;
import React from "react";
import { geInputPropsForTextField } from "../components/utils";

export type VarablesProps = {
  keyData: any;
  valueKey: any;
  indexValue: any;
  dataValue: any;
  handlerEvent: any;
  valueerror:any;
};
class TextFiled extends React.Component<VarablesProps> {
  // constructor(props){
  //     super(props)
  //      name:null
  // }

  render() {
    const { keyData } = this.props;
    const { valueKey } = this.props;
    const { indexValue } = this.props;
    const { handlerEvent } = this.props;
    const { dataValue } = this.props;
    const {valueerror}=this.props;
    // console.log(this.props.name)
    return (
      <div>
        <label htmlFor={keyData}>
          {geInputPropsForTextField(valueKey)?.name}
        </label>
        <input
          className="input-edit"
          id={keyData}
          required={true}
          readOnly={geInputPropsForTextField(valueKey)?.disabled}
          type={geInputPropsForTextField(valueKey)?.type}
          key={indexValue}
          name={geInputPropsForTextField(valueKey)?.name}
          onChange={(e) => handlerEvent(e, indexValue, valueKey)}
          value={dataValue}
          placeholder={geInputPropsForTextField(valueKey)?.placeholder}
        />
        <div className="HelperText">
          {valueerror}
        </div>
      </div>
    );
  }
}

export default TextFiled;

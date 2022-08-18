import React from "react";
import { geInputPropsForTextField } from "../components/utils";

export type variablesProps = {
  keyData: any;
  valueKey: any;
  indexValue: any;
  dataValue: any;
  handlerEvent: any;
  valueOfError:any;
};
class TextFiled extends React.Component<variablesProps> {
  render() {
    const { keyData } = this.props;
    const { valueKey } = this.props;
    const { indexValue } = this.props;
    const { handlerEvent } = this.props;
    const { dataValue } = this.props;
    const {valueOfError}=this.props;
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
          {valueOfError}
        </div>
      </div>
    );
  }
}

export default TextFiled;

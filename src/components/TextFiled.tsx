import React from "react";
import { getInputPropsForTextField } from "../components/utils";

export type variablesProps = {
  keyData: any;
  valueKey: any;
  indexValue: any;
  dataValue: any;
  handlerEvent: any;
  valueOfError: any;
};
class TextFiled extends React.Component<variablesProps> {
  render() {
    const { keyData } = this.props;
    const { valueKey } = this.props;
    const { indexValue } = this.props;
    const { handlerEvent } = this.props;
    const { dataValue } = this.props;
    const { valueOfError } = this.props;
    return (
      <div>
        <label htmlFor={keyData}>
          {getInputPropsForTextField(valueKey)?.name}
        </label>
        <input
          className="input-edit"
          id={keyData}
          required={true}
          readOnly={getInputPropsForTextField(valueKey)?.disabled}
          type={getInputPropsForTextField(valueKey)?.type}
          key={indexValue}
          name={getInputPropsForTextField(valueKey)?.name}
          onChange={(e) => handlerEvent(e, indexValue, valueKey)}
          value={dataValue}
          placeholder={getInputPropsForTextField(valueKey)?.placeholder}
        />
        <div className="HelperText">{valueOfError}</div>
      </div>
    );
  }
}

export default TextFiled;

import React from "react";
import { getInputPropsForTextField } from "./utils";

export type variablesProps = {
  handlerEvent: any;
  name: any;
};

class TextFiledForMarks extends React.Component<variablesProps> {
  render() {
    const { handlerEvent } = this.props;
    const { name } = this.props;

    return (
      <div className="div-input-mark" key={getInputPropsForTextField(name)?.id}>
        <label htmlFor={getInputPropsForTextField(name)?.id}>
          {getInputPropsForTextField(name)?.name}
        </label>
        <input 
        className="input-mark"
          id={getInputPropsForTextField(name)?.id}
          placeholder={getInputPropsForTextField(name)?.name}
          onChange={(e) => handlerEvent(e, name)}
          type={getInputPropsForTextField(name)?.type}
        />
      </div>
    );
  }
}

export default TextFiledForMarks;

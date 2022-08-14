export const geInputPropsForTextField = (name) => {
  switch (name) {
    case "st_id":
      return {
        disabled: true,
        type: "number",
        name:name.split("_")[1].toUpperCase(),
        placeholder:"ex:120352"

      };
      case "st_name":
        return{
            disabled: true,
            type: "text",
            name:name.split("_")[1].toUpperCase(),
            placeholder:"ex:rahaf"
        };
        case "st_Email":
            return{
                disabled: false,
                type: "text",
                name:name.split("_")[1].toUpperCase(),
                placeholder:"ex:ex@gmail.com"
            };
            case "st_avg":
                return{
                    disabled: true,
                    type: "number",
                    name:name.split("_")[1].toUpperCase(),
                    placeholder:"ex:5"
                };

                case "st_registerDate":
                    return{
                        disabled: false,
                        type: "text",
                        name:name.split("_")[1].toUpperCase(),
                        placeholder:"ex:YY-MM-DD"
                    };
    
                    case "st_register":
                        return{
                            disabled: false,
                            type: "text",
                            name:name.split("_")[1].toUpperCase(),
                            placeholder:"ex:true/false"
                        };

    default:
      return {
        disabled: false,
        type: "text",
        name,
      };
  }
};

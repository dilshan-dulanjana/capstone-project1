/// <reference types="react" />
import { FormControlProps } from '../FormControl/FormControl.types';
declare const FormControl: import("react").ForwardRefExoticComponent<FormControlProps> & {
    displayName?: string | undefined;
} & {
    Label: import("./FormControlLabel/FormControlLabel.types").FormControlLabelComponent;
    Text: import("./FormControlText/FormControlText.types").FormControlTextComponent;
    InputGroup: import("react").ForwardRefExoticComponent<import("../InputGroup").InputGroupProps> & {
        displayName?: string | undefined;
    } & {
        Input: import("../Input/Input.types").InputComponent;
        Textarea: import("../Textarea/Textarea.types").TextareaComponent;
        Select: import("../Select/Select.types").SelectComponent;
        Combobox: import("react").ForwardRefExoticComponent<import("../Combobox").ComboboxProps> & {
            displayName?: string | undefined;
        } & {
            Group: import("../Combobox/ComboboxGroup/ComboboxGroup.types").ComboboxGroupComponent;
            Option: import("../Combobox/ComboboxOption/ComboboxOption.types").ComboboxOptionComponent;
        };
        Text: import("../InputGroup/InputGroupText/InputGroupText.types").InputGroupTextComponent;
        Button: import("../Button/Button.types").ButtonComponent;
    };
    Input: import("../Input/Input.types").InputComponent;
    Textarea: import("../Textarea/Textarea.types").TextareaComponent;
    Select: import("../Select/Select.types").SelectComponent;
    Combobox: import("react").ForwardRefExoticComponent<import("../Combobox").ComboboxProps> & {
        displayName?: string | undefined;
    } & {
        Group: import("../Combobox/ComboboxGroup/ComboboxGroup.types").ComboboxGroupComponent;
        Option: import("../Combobox/ComboboxOption/ComboboxOption.types").ComboboxOptionComponent;
    };
};
export default FormControl;
//# sourceMappingURL=FormControl.d.ts.map
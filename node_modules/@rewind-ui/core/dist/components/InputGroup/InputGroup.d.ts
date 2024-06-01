/// <reference types="react" />
import { InputGroupProps } from '../InputGroup/InputGroup.types';
declare const InputGroup: import("react").ForwardRefExoticComponent<InputGroupProps> & {
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
    Text: import("./InputGroupText/InputGroupText.types").InputGroupTextComponent;
    Button: import("../Button/Button.types").ButtonComponent;
};
export default InputGroup;
//# sourceMappingURL=InputGroup.d.ts.map
/// <reference types="react" />
import { TabsProps } from '../Tabs/Tabs.types';
declare const Tabs: import("react").ForwardRefExoticComponent<TabsProps> & {
    displayName?: string | undefined;
} & {
    Tab: import("./Tab/Tab.types").TabComponent;
    List: import("react").FunctionComponent<Omit<any, "ref">>;
    Content: import("react").FunctionComponent<Omit<any, "ref">>;
};
export default Tabs;
//# sourceMappingURL=Tabs.d.ts.map
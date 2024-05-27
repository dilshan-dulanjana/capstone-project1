/// <reference types="react" />
import { TableProps } from '../Table/Table.types';
declare const Table: import("react").ForwardRefExoticComponent<Omit<TableProps, "ref"> & import("react").RefAttributes<HTMLDivElement>> & {
    displayName?: string | undefined;
} & {
    Thead: import("./Thead/Thead.types").TheadComponent;
    Tbody: import("./Tbody/Tbody.types").TbodyComponent;
    Tfoot: import("./Tfoot/Tfoot.types").TfootComponent;
    Tr: import("./Tr/Tr.types").TrComponent;
    Th: import("./Th/Th.types").ThComponent;
    Td: import("./Td/Td.types").TdComponent;
};
export default Table;
//# sourceMappingURL=Table.d.ts.map
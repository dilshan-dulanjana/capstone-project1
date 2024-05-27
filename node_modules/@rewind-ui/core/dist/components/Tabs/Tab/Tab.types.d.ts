import { ComponentPropsWithRef, ForwardRefExoticComponent } from 'react';
export type TabStateType = 'active' | 'inactive';
export interface TabProps extends ComponentPropsWithRef<'button'> {
    anchor: string;
}
export type TabComponent = ForwardRefExoticComponent<TabProps> & {
    displayName?: string;
};
//# sourceMappingURL=Tab.types.d.ts.map
declare const accordionStyles: {
    base: (props?: ({
        color?: "white" | "gray" | "slate" | "zinc" | null | undefined;
        radius?: "none" | "sm" | "base" | "md" | "lg" | null | undefined;
        shadow?: "none" | "sm" | "base" | "md" | "lg" | "xl" | null | undefined;
        shadowColor?: "gray" | "slate" | "zinc" | "none" | null | undefined;
        size?: "sm" | "md" | "lg" | "xl" | null | undefined;
        tone?: "solid" | "light" | "transparent" | null | undefined;
        bordered?: boolean | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    body: (props?: ({
        size?: "sm" | "md" | "lg" | "xl" | null | undefined;
        bordered?: boolean | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    header: (props?: ({
        activeColor?: "white" | "blue" | "red" | "green" | "yellow" | "purple" | "gray" | "dark" | "black" | null | undefined;
        size?: "sm" | "md" | "lg" | "xl" | null | undefined;
        state?: "active" | "inactive" | null | undefined;
        tone?: "solid" | "light" | null | undefined;
        radius?: "none" | "sm" | "base" | "md" | "lg" | null | undefined;
        bordered?: boolean | null | undefined;
        withRing?: boolean | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    icon: (props?: ({
        state?: "active" | "inactive" | null | undefined;
        size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
};
export { accordionStyles };
//# sourceMappingURL=Accordion.styles.d.ts.map
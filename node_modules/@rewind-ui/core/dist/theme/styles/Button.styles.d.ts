declare const buttonStyles: {
    base: (props?: ({
        tone?: "solid" | "light" | "transparent" | "outline" | null | undefined;
        color?: "white" | "blue" | "red" | "green" | "yellow" | "purple" | "gray" | "dark" | "black" | null | undefined;
        size?: "sm" | "md" | "lg" | "xs" | null | undefined;
        radius?: "none" | "sm" | "base" | "md" | "lg" | "full" | null | undefined;
        animation?: "none" | "pulse" | "bounce" | null | undefined;
        shadow?: "none" | "sm" | "base" | "md" | "lg" | "xl" | null | undefined;
        shadowColor?: "white" | "blue" | "red" | "green" | "yellow" | "purple" | "gray" | "dark" | "black" | "none" | null | undefined;
        icon?: boolean | null | undefined;
        loading?: boolean | null | undefined;
        disabled?: boolean | null | undefined;
        withRing?: boolean | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    chevron: (props?: ({
        open?: boolean | null | undefined;
        chevronRotation?: boolean | null | undefined;
        size?: "sm" | "md" | "lg" | "xs" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    spinner: (props?: ({
        size?: "sm" | "md" | "lg" | "xs" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
};
export { buttonStyles };
//# sourceMappingURL=Button.styles.d.ts.map
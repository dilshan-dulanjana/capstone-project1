declare const selectStyles: {
    base: (props?: ({
        color?: "blue" | "purple" | "gray" | "dark" | "black" | null | undefined;
        size?: "sm" | "md" | "lg" | "xs" | null | undefined;
        tone?: "solid" | "light" | "transparent" | null | undefined;
        radius?: "none" | "sm" | "base" | "md" | "lg" | "full" | null | undefined;
        shadow?: "none" | "sm" | "base" | "md" | null | undefined;
        hasLeftIcon?: boolean | null | undefined;
        validation?: "none" | "valid" | "invalid" | "warning" | null | undefined;
        withRing?: boolean | null | undefined;
        disabled?: boolean | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    wrapper: (props?: import("class-variance-authority/dist/types").ClassProp | undefined) => string;
    icon: (props?: ({
        tone?: "solid" | "light" | "transparent" | null | undefined;
        size?: "sm" | "md" | "lg" | "xs" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    leftIconWrapper: (props?: ({
        size?: "sm" | "md" | "lg" | "xs" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    rightIconWrapper: (props?: ({
        size?: "sm" | "md" | "lg" | "xs" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
};
export { selectStyles };
//# sourceMappingURL=Select.styles.d.ts.map
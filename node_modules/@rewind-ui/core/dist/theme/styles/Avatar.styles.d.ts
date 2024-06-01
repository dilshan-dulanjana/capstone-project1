declare const avatarStyles: {
    base: (props?: ({
        tone?: "solid" | "light" | "outline" | "glossy" | null | undefined;
        color?: "white" | "blue" | "red" | "green" | "yellow" | "purple" | "gray" | "dark" | "black" | null | undefined;
        size?: "sm" | "md" | "lg" | "xl" | "xs" | null | undefined;
        radius?: "none" | "sm" | "base" | "md" | "lg" | "full" | null | undefined;
        shadow?: "none" | "sm" | "base" | "md" | "lg" | "xl" | null | undefined;
        shadowColor?: "white" | "blue" | "red" | "green" | "yellow" | "purple" | "gray" | "dark" | "black" | "none" | null | undefined;
        outlined?: boolean | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    status: (props?: ({
        position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | null | undefined;
        size?: "sm" | "md" | "lg" | "xl" | "xs" | null | undefined;
        radius?: "none" | "sm" | "base" | "md" | "lg" | "full" | null | undefined;
        status?: "online" | "offline" | "busy" | "away" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    image: (props?: ({
        radius?: "none" | "sm" | "base" | "md" | "lg" | "full" | null | undefined;
    } & import("class-variance-authority/dist/types").ClassProp) | undefined) => string;
    group: (props?: import("class-variance-authority/dist/types").ClassProp | undefined) => string;
};
export { avatarStyles };
//# sourceMappingURL=Avatar.styles.d.ts.map
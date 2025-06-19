import { ComponentProps } from "react";
import { Button } from "tamagui";

interface Props extends Omit<ComponentProps<typeof Button>, "variant"> {
    onPress: VoidFunction;
    variant?: "primary" | "secondary";
}

export default function DefaultButton({
    onPress,
    variant = "primary",
    children,
    ...props
}: Props) {
    return (
        <Button
            variant="outlined"
            onPress={onPress}
            h={50}
            br={50}
            textProps={{ fos: 18 }}
            bg={variant === "primary" ? "#FFD700" : "white"}
            borderColor={variant === "primary" ? "#FFD700" : "gray"}
            {...props}
        >
            {children}
        </Button>
        
    )
}
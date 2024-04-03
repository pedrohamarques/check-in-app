import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import type { TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
    title: string;
    isLoading?: boolean;
    testID?: string;
};

export function Button({
    title,
    testID = "components.button",
    isLoading = false,
    ...rest
}: ButtonProps) {
    return (
        <TouchableOpacity
            testID={testID}
            disabled={isLoading}
            activeOpacity={0.7}
            className='w-full h-14 bg-orange-500 items-center justify-center rounded-lg'
            {...rest}>
            {isLoading ? (
                <ActivityIndicator
                    className='text-green-500'
                    testID='components.button.activity-indicator'
                />
            ) : (
                <Text className='text-green-500 text-base font-bold uppercase'>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

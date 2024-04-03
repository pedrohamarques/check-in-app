import React from "react";
import { TextInput, View } from "react-native";

import { colors } from "@styles/colors";

import type { TextInputProps } from "react-native";

type InputProps = React.PropsWithChildren & {
    testID?: string;
};

function Input({ testID = "components.input", children }: InputProps) {
    return (
        <View
            className='w-full h-14 flex-row items-center gap-3 p-3 border border-green-400 rounded-lg'
            testID={testID}>
            {children}
        </View>
    );
}

function Field({ ...rest }: TextInputProps) {
    return (
        <TextInput
            className='flex-1 text-white text-base font-regular'
            placeholderTextColor={colors.gray[200]}
            {...rest}
        />
    );
}

Input.Field = Field;

export { Input };

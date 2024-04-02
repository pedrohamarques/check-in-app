import React from "react";
import { Text, View } from "react-native";

type HeaderProps = {
    title: string;
    testID?: string;
};

export function Header({ title, testID = "components.header" }: HeaderProps) {
    return (
        <View
            className='w-full h-28 flex-row items-end bg-black/20 px-8 pb-4 border-white/10 border-b'
            testID={testID}>
            <Text className='text-white flex-1 font-medium text-center text-lg'>
                {title}
            </Text>
        </View>
    );
}

import React from "react";
import { ActivityIndicator } from "react-native";

type LoadingProps = {
    testID?: string;
};

export function Loading({ testID = "components.loading" }: LoadingProps) {
    return (
        <ActivityIndicator
            className='flex-1 bg-green-500 items-center justify-center text-orange-500'
            testID={testID}
        />
    );
}

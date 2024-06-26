import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import {
    useFonts,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Loading } from "@components/loading";

import "@styles/global.css";
import { View } from "react-native";

export default function Layout() {
    const [isFontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold,
    });

    if (!isFontsLoaded) {
        return <Loading testID='app._layout.loading' />;
    }

    return (
        <View testID='app._layout.slot-view'>
            <StatusBar style='light' />
            <Slot />
        </View>
    );
}

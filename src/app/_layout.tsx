import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "@styles/global.css";

export default function Layout() {
    return (
        <>
            <StatusBar style='light' />
            <Slot />
        </>
    );
}

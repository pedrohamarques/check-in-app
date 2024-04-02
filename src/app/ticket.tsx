import { Header } from "@components/header";
import React from "react";
import { View } from "react-native";

export default function Ticket() {
    return (
        <View className='flex-1 bg-green-500'>
            <Header title='Minha credencial' />
        </View>
    );
}

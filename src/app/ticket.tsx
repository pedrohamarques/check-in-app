import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { Credential } from "@components/credential";
import { Header } from "@components/header";
import { Button } from "@components/button";

import { colors } from "@styles/colors";

export default function Ticket() {
    return (
        <View className='flex-1 bg-green-500'>
            <Header title='Minha credencial' />
            <ScrollView
                className='-mt-28 -z-10'
                contentContainerClassName='px-8 pb-8'
                showsVerticalScrollIndicator={false}>
                <Credential />

                <FontAwesome
                    name='angle-double-down'
                    size={24}
                    color={colors.gray[300]}
                    className='self-center my-6'
                />

                <Text className='text-white font-bold text-2xl mt-4'>
                    Compartilhar credencial
                </Text>
                <Text className='text-white font-regular text-base mt-1 mb-6'>
                    Mostre ao mundo que você vai particiapr do Unite Summit!
                </Text>

                <Button title='Compartilhar' />

                <TouchableOpacity activeOpacity={0.7} className='mt-10'>
                    <Text className='text-base text-white font-bold text-center'>
                        Remover ingresso
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}
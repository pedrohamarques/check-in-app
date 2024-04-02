import React from "react";
import { Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { Input } from "@components/input";
import { Button } from "@components/button";

import { colors } from "@styles/colors";

export default function Home() {
    return (
        <View className='bg-green-500 flex-1 items-center justify-center p-8'>
            <Image
                source={require("@assets/logo.png")}
                className='h-16'
                resizeMode='contain'
            />

            <View className='w-full mt-12 gap-3'>
                <Input>
                    <MaterialCommunityIcons
                        name='ticket-confirmation-outline'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field placeholder='Código de acesso' />
                </Input>
                <Button title='Acessar credencial' />
                <Link
                    href='/register'
                    className='text-gray-100 text-base font-bold text-center mt-8'>
                    Ainda não possui ingresso?
                </Link>
            </View>
        </View>
    );
}

import React from "react";
import { Image, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, Redirect } from "expo-router";

import { Input } from "@components/input";
import { Button } from "@components/button";

import { colors } from "@styles/colors";

import { useHome } from "@hooks/useHome";

export default function Home() {
    const { setCode, handleAccessCredentials, isLoading, badgeStore } =
        useHome();

    if (badgeStore.data?.checkInURL) {
        return (
            <View testID='app.home.redirect'>
                <Redirect href={"/ticket"} />
            </View>
        );
    }

    return (
        <View className='bg-green-500 flex-1 items-center justify-center p-8'>
            <Image
                source={require("@assets/logo.png")}
                className='h-16'
                resizeMode='contain'
                testID='app.home.logo-image'
            />

            <View className='w-full mt-12 gap-3'>
                <Input testID='app.home.code-input'>
                    <MaterialCommunityIcons
                        name='ticket-confirmation-outline'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder='Código de acesso'
                        onChangeText={setCode}
                    />
                </Input>
                <Button
                    title='Acessar credencial'
                    onPress={handleAccessCredentials}
                    isLoading={isLoading}
                    testID='app.home.button'
                />
                <View testID='app.home.link'>
                    <Link
                        href='/register'
                        className='text-gray-100 text-base font-bold text-center mt-8'>
                        Ainda não possui ingresso?
                    </Link>
                </View>
            </View>
        </View>
    );
}

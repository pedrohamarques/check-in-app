import React from "react";
import { Image, View } from "react-native";
import { Link } from "expo-router";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";

import { Button } from "@components/button";
import { Input } from "@components/input";

import { colors } from "@styles/colors";

import { useRegister } from "@hooks/useRegister";

export default function Register() {
    const { handleRegister, setEmail, setName, isLoading } = useRegister();
    return (
        <View className='bg-green-500 flex-1 items-center justify-center p-8'>
            <Image
                source={require("@assets/logo.png")}
                className='h-16'
                resizeMode='contain'
            />

            <View className='w-full mt-12 gap-3'>
                <Input>
                    <FontAwesome6
                        name='user-circle'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder='Nome completo'
                        onChangeText={setName}
                    />
                </Input>
                <Input>
                    <MaterialIcons
                        name='alternate-email'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field
                        placeholder='E-mail'
                        keyboardType='email-address'
                        onChangeText={setEmail}
                    />
                </Input>
                <Button
                    title='Realizar inscrição'
                    onPress={handleRegister}
                    testID='app.register.button'
                    isLoading={isLoading}
                />
                <Link
                    href='/'
                    className='text-gray-100 text-base font-bold text-center mt-8'>
                    Já possui ingresso?
                </Link>
            </View>
        </View>
    );
}

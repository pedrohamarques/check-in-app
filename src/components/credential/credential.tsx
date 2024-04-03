import React from "react";
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors } from "@styles/colors";

import { QrCode } from "@components/qrcode";

import { BadgeStore } from "@stores/badge-store";

type CredentialProps = {
    image?: string;
    testID?: string;
    credentialData: BadgeStore;
    onChangeAvatar: () => void;
    onShowQrCode: () => void;
};

export function Credential({
    onChangeAvatar,
    onShowQrCode,
    image,
    testID = "components.credential",
    credentialData,
}: CredentialProps) {
    return (
        <View className='w-full self-stretch items-center' testID={testID}>
            <Image
                source={require("@assets/ticket/band.png")}
                className='w-24 h-52 z-10'
            />

            <View className='bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5'>
                <ImageBackground
                    source={require("@assets/ticket/header.png")}
                    className='px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden'>
                    <View className='w-full flex-row items-center justify-between'>
                        <Text className='text-zinc-50 text-sm font-bold'>
                            {credentialData.eventTitle}
                        </Text>
                        <Text className='text-zinc-50 text-sm font-bold'>
                            #{credentialData.id}
                        </Text>
                    </View>

                    <View className='w-40 h-40 bg-black rounded-full mt-2' />
                </ImageBackground>
                {image ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={onChangeAvatar}>
                        <Image
                            source={{
                                uri: image,
                            }}
                            className='w-36 h-36 rounded-full -mt-24'
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        className='w-36 h-36 rounded-full -mt-24 items-center justify-center bg-gray-400'
                        onPress={onChangeAvatar}>
                        <Feather
                            name='camera'
                            color={colors.green[400]}
                            size={32}
                        />
                    </TouchableOpacity>
                )}

                <Text className='font-bold text-2xl text-zinc-50 mt-4'>
                    {credentialData.name}
                </Text>
                <Text className='font-regular text-base text-zinc-300 mb-4'>
                    {credentialData.email}
                </Text>

                <QrCode
                    testID='components.credential.qrcode'
                    value='teste'
                    size={120}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    className='mt-6'
                    onPress={onShowQrCode}>
                    <Text className='font-bold text-orange-500 text-sm'>
                        Ampliar QRCode
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

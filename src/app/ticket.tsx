import React from "react";
import { Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MotiView } from "moti";

import { Credential } from "@components/credential";
import { Header } from "@components/header";
import { Button } from "@components/button";
import { QrCode } from "@components/qrcode";

import { colors } from "@styles/colors";
import { useTicket } from "@hooks/useTicket";
import { Redirect } from "expo-router";

export default function Ticket() {
    const {
        handleSelectImage,
        setExpandQRCode,
        expandQRCode,
        handleRemoveCredentials,
        badgeStore,
        handleShare,
    } = useTicket();

    if (!badgeStore.data?.checkInURL) {
        return (
            <View testID='app.ticket.redirect'>
                <Redirect href={"/"} />
            </View>
        );
    }

    return (
        <View className='flex-1 bg-green-500'>
            <Header title='Minha credencial' testID='app.ticket.header' />
            <ScrollView
                className='-mt-28 -z-10'
                contentContainerClassName='px-8 pb-8'
                showsVerticalScrollIndicator={false}>
                <Credential
                    image={badgeStore.data.image}
                    onChangeAvatar={handleSelectImage}
                    testID='app.ticket.credential'
                    onShowQrCode={() => setExpandQRCode(true)}
                    credentialData={badgeStore.data}
                />

                <MotiView
                    from={{ translateY: 0 }}
                    animate={{ translateY: 10 }}
                    testID='app.ticket.double-down-image'
                    transition={{ loop: true, type: "timing", duration: 700 }}>
                    <FontAwesome
                        name='angle-double-down'
                        size={24}
                        color={colors.gray[300]}
                        className='self-center my-6'
                    />
                </MotiView>

                <Text className='text-white font-bold text-2xl mt-4'>
                    Compartilhar credencial
                </Text>
                <Text className='text-white font-regular text-base mt-1 mb-6'>
                    Mostre ao mundo que você vai participar do{" "}
                    {badgeStore.data.eventTitle}!
                </Text>

                <Button
                    title='Compartilhar'
                    testID='app.ticket.button'
                    onPress={handleShare}
                />

                <TouchableOpacity
                    activeOpacity={0.7}
                    className='mt-10'
                    onPress={handleRemoveCredentials}>
                    <Text className='text-base text-white font-bold text-center'>
                        Remover ingresso
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={expandQRCode}
                statusBarTranslucent
                testID='app.ticket.modal'>
                <View className='flex-1 bg-green-500 items-center justify-center'>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => setExpandQRCode(false)}>
                        <QrCode value='teste' size={300} />
                        <Text className='font-bold text-orange-500 text-md text-center mt-10'>
                            Fechar
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert, Share } from "react-native";

import { useBadgeStore } from "@stores/badge-store";

export function useTicket() {
    const [expandQRCode, setExpandQRCode] = useState(false);

    const badgeStore = useBadgeStore();

    async function handleSelectImage() {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 4],
            });

            if (result.assets) {
                badgeStore.updateAvatar(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Foto", "Não foi possível selecionar a imagem");
        }
    }

    function handleRemoveCredentials() {
        badgeStore.remove();
    }

    async function handleShare() {
        try {
            if (badgeStore.data?.checkInURL) {
                await Share.share({
                    message: badgeStore.data.checkInURL,
                });
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Compartilhar", "Não foi possível compartilhar");
        }
    }

    return {
        handleSelectImage,
        setExpandQRCode,
        handleRemoveCredentials,
        handleShare,
        expandQRCode,
        badgeStore,
    };
}

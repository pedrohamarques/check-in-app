import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

import { useBadgeStore } from "@stores/badge-store";

export function useTicket() {
    const [image, setImage] = useState("");
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
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
            Alert.alert("Foto", "Não foi possível selecionar a imagem");
        }
    }

    function handleRemoveCredentials() {
        badgeStore.remove();
    }

    return {
        image,
        handleSelectImage,
        setExpandQRCode,
        handleRemoveCredentials,
        expandQRCode,
        badgeStore,
    };
}

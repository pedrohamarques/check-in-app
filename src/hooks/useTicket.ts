import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export function useTicket() {
    const [image, setImage] = useState("");

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

    return {
        image,
        handleSelectImage,
    };
}

import { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import axios from "axios";

import { api } from "@services/api";

import { EVENT_ID } from "@constants/api";

export function useRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister() {
        try {
            if (!name.trim() || !email.trim()) {
                Alert.alert("Inscrição", "Preencha todos os campos!");
            }

            setIsLoading(true);

            const registerResponse = await api.post(
                `/events/${EVENT_ID}/attendees`,
                {
                    name,
                    email,
                },
            );

            if (registerResponse.data.attendeeId) {
                Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
                    { text: "Ok", onPress: () => router.push("/ticket") },
                ]);
            }
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {
                if (
                    String(error.response?.data.message).includes(
                        "already registered",
                    )
                ) {
                    return Alert.alert(
                        "Inscrição",
                        "Esse e-mail já está cadastrado!",
                    );
                }
            }
            Alert.alert("Inscrição", "Não foi possível fazer a inscrição");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        handleRegister,
        setName,
        setEmail,
        isLoading,
    };
}

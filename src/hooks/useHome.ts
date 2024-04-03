import { useState } from "react";
import { Alert } from "react-native";

import { api } from "@services/api";

import { useBadgeStore } from "@stores/badge-store";

export function useHome() {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const badgeStore = useBadgeStore();

    async function handleAccessCredentials() {
        try {
            if (!code.trim()) {
                return Alert.alert(
                    "Credencial",
                    "Informe o credencial do ingresso!",
                );
            }

            setIsLoading(true);

            const response = await api.get(`/attendees/${code}/badge`);
            badgeStore.save(response.data.badge);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            Alert.alert("Credencial", "Credencial não encontrada");
        }
    }

    return {
        setCode,
        handleAccessCredentials,
        code,
        isLoading,
        badgeStore,
    };
}

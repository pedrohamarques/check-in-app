import { useState } from "react";
import { Alert } from "react-native";

export function useHome() {
    const [code, setCode] = useState("");

    function handleAccessCredentials() {
        if (!code.trim()) {
            return Alert.alert(
                "Credencial",
                "Informe o credencial do ingresso!",
            );
        }
    }

    return {
        setCode,
        handleAccessCredentials,
        code,
    };
}

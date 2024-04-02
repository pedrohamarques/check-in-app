import { useState } from "react";
import { Alert } from "react-native";

export function useRegister() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleRegister() {
        if (!name.trim() || !email.trim()) {
            Alert.alert("Inscrição", "Preencha todos os campos!");
        }
    }
    return {
        handleRegister,
        setName,
        setEmail,
    };
}

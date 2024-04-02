import React from "react";
import { View } from "react-native";
import QRCodeSvg from "react-native-qrcode-svg";

import { colors } from "@styles/colors";

type QrCodeProps = {
    testID?: string;
    value: string;
    size: number;
};

export function QrCode({
    value,
    size,
    testID = "components.qrcode",
}: QrCodeProps) {
    return (
        <View testID={testID}>
            <QRCodeSvg
                value={value}
                size={size}
                color={colors.white}
                backgroundColor='transparent'
            />
        </View>
    );
}

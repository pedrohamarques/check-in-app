import React from "react";
import { render, screen } from "@testing-library/react-native";

import { QrCode } from "../qrcode";

const mockValues = {
    value: "value",
    size: 12,
};

describe("components/qrcode/<QrCode />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<QrCode {...mockValues} />);

        expect(screen.getByTestId("components.qrcode")).toBeTruthy();
    });
});

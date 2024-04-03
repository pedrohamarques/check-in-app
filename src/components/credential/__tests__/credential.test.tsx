import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { DUMMY_USER_BADGE } from "@constants/dummy";
import { Credential } from "../credential";

const mockValues = {
    image: "someImage",
    credentialData: DUMMY_USER_BADGE,
    onChangeAvatar: jest.fn(),
    onShowQrCode: jest.fn(),
};

describe("components/credential/<Credential />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly with image", () => {
        render(<Credential {...mockValues} />);

        expect(screen.getByText("Some Event")).toBeTruthy();
        expect(screen.getByText("#1")).toBeTruthy();
        expect(
            screen.getByTestId("components.credential.touchable-image"),
        ).toBeTruthy();

        expect(
            screen.queryByTestId("components.credential.touchable-camera"),
        ).toBeNull();

        expect(screen.getByText("John")).toBeTruthy();
        expect(screen.getByText("john@test.com")).toBeTruthy();

        expect(screen.getByTestId("components.credential.qrcode")).toBeTruthy();
        expect(screen.getByText("Ampliar QRCode")).toBeTruthy();
    });

    it("renders component properly without image", () => {
        render(<Credential {...mockValues} image={undefined} />);

        expect(screen.getByText("Some Event")).toBeTruthy();
        expect(screen.getByText("#1")).toBeTruthy();
        expect(
            screen.queryByTestId("components.credential.touchable-image"),
        ).toBeNull();

        expect(
            screen.getByTestId("components.credential.touchable-camera"),
        ).toBeTruthy();

        expect(screen.getByText("John")).toBeTruthy();
        expect(screen.getByText("john@test.com")).toBeTruthy();

        expect(screen.getByTestId("components.credential.qrcode")).toBeTruthy();
        expect(screen.getByText("Ampliar QRCode")).toBeTruthy();
    });

    it("calls onChangeAvatar when image button is pressed", () => {
        render(<Credential {...mockValues} />);

        fireEvent.press(
            screen.getByTestId("components.credential.touchable-image"),
        );

        expect(mockValues.onChangeAvatar).toHaveBeenCalledTimes(1);
    });

    it("calls onShowQrCode when button below qr code is pressed", () => {
        render(<Credential {...mockValues} />);

        fireEvent.press(screen.getByText("Ampliar QRCode"));

        expect(mockValues.onShowQrCode).toHaveBeenCalledTimes(1);
    });
});

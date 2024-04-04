import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import Register from "../register";

const mockLink = jest.fn();

jest.mock("expo-router", () => ({
    Link: () => mockLink(),
}));

const mockHandleRegister = jest.fn();

jest.mock("@hooks/useRegister", () => ({
    useRegister: () => ({
        handleRegister: mockHandleRegister,
        setEmail: jest.fn(),
        setName: jest.fn(),
        isLoading: false,
    }),
}));

describe("app/register/<Register />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders screen properly", () => {
        render(<Register />);

        expect(screen.getByTestId("app.register.logo-image")).toBeTruthy();

        expect(screen.getByTestId("app.register.name-input")).toBeTruthy();
        expect(screen.getByPlaceholderText("Nome completo")).toBeTruthy();
        expect(screen.getByTestId("app.register.email-input")).toBeTruthy();
        expect(screen.getByPlaceholderText("E-mail")).toBeTruthy();

        expect(screen.getByTestId("app.register.button")).toBeTruthy();
        expect(screen.getByTestId("app.register.link-view")).toBeTruthy();
    });

    it("calls handleRegister when register button is pressed", () => {
        render(<Register />);

        fireEvent.press(screen.getByTestId("app.register.button"));

        expect(mockHandleRegister).toHaveBeenCalledTimes(1);
    });
});

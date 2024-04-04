import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import Home from "..";
import { DUMMY_USER_BADGE } from "@constants/dummy";

const dummyBadgeData = { data: DUMMY_USER_BADGE };

jest.mock("expo-router");

const mockUseHome = jest.fn();

const mockUseHomeValues = {
    setCode: jest.fn(),
    handleAccessCredentials: jest.fn(),
    isLoading: false,
    badgeStore: {},
};

jest.mock("@hooks/useHome", () => ({
    useHome: () => mockUseHome(),
}));

describe("app/index/<Home />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseHome.mockReturnValue(mockUseHomeValues);
    });

    it("renders screen properly", () => {
        render(<Home />);

        expect(screen.getByTestId("app.home.logo-image")).toBeTruthy();

        expect(screen.getByTestId("app.home.code-input")).toBeTruthy();
        expect(screen.getByPlaceholderText("Código de acesso")).toBeTruthy();

        expect(screen.getByTestId("app.home.button")).toBeTruthy();

        expect(screen.getByTestId("app.home.link")).toBeTruthy();

        expect(screen.queryByTestId("app.home.redirect")).toBeNull();
    });

    it("does not render screen when checkIn URL exists, redirecting to ticket screen", () => {
        mockUseHome.mockReturnValueOnce({
            ...mockUseHomeValues,
            badgeStore: dummyBadgeData,
        });

        render(<Home />);

        expect(screen.queryByTestId("app.home.logo-image")).toBeNull();

        expect(screen.queryByTestId("app.home.code-input")).toBeNull();
        expect(screen.queryByPlaceholderText("Código de acesso")).toBeNull();

        expect(screen.queryByTestId("app.home.button")).toBeNull();

        expect(screen.queryByTestId("app.home.link")).toBeNull();

        expect(screen.getByTestId("app.home.redirect")).toBeTruthy();
    });

    it("calls handleAccessCredentials when button is pressed", () => {
        render(<Home />);

        fireEvent.press(screen.getByTestId("app.home.button"));

        expect(mockUseHomeValues.handleAccessCredentials).toHaveBeenCalledTimes(
            1,
        );
    });
});

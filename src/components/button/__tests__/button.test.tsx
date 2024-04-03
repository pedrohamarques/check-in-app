import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import { Button } from "../button";

const mockValues = {
    title: "Some title",
    onPress: jest.fn(),
    isLoading: false,
};

describe("components/button/<Button />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<Button {...mockValues} />);

        expect(screen.getByTestId("components.button")).toBeTruthy();
        expect(screen.getByText("Some title")).toBeTruthy();

        expect(
            screen.queryByTestId("components.button.activity-indicator"),
        ).toBeNull();
    });

    it("renders component properly when it is loading", () => {
        render(<Button {...mockValues} isLoading />);

        expect(screen.getByTestId("components.button")).toBeTruthy();
        expect(screen.queryByText("Some title")).toBeNull();

        expect(
            screen.getByTestId("components.button.activity-indicator"),
        ).toBeTruthy();
    });

    it("calls onPress when component is pressed", () => {
        render(<Button {...mockValues} />);

        fireEvent.press(screen.getByTestId("components.button"));

        expect(mockValues.onPress).toHaveBeenCalledTimes(1);
    });
});

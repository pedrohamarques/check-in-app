import React from "react";
import { render, renderRouter, screen } from "expo-router/testing-library";

import Layout from "../_layout";

const mockUseFonts = jest.fn();

jest.mock("@expo-google-fonts/roboto", () => ({
    useFonts: () => mockUseFonts(),
}));

describe("/app/layout/<Layout />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders loading component when fonts are not loaded", () => {
        mockUseFonts.mockReturnValueOnce([false]);

        render(<Layout />);

        expect(screen.getByTestId("app._layout.loading")).toBeTruthy();
        expect(screen.queryByTestId("app._layout.slot-view")).toBeNull();
    });

    it("renders screen component when fonts are loaded", () => {
        mockUseFonts.mockReturnValueOnce([true]);

        const mockLayoutComponent = jest.fn(() => <Layout />);

        renderRouter({ index: mockLayoutComponent });

        expect(screen.queryByTestId("app._layout.loading")).toBeNull();
        expect(screen.getByTestId("app._layout.slot-view")).toBeTruthy();
    });
});

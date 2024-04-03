import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Header } from "../header";

const mockValues = {
    title: "Some Title",
};

describe("components/header/<Header />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<Header {...mockValues} />);

        expect(screen.getByTestId("components.header")).toBeTruthy();
        expect(screen.getByText("Some Title")).toBeTruthy();
    });
});

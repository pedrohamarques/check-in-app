import { render, screen } from "@testing-library/react-native";
import React from "react";
import { Loading } from "../loading";

describe("components/loading/<Loading />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(<Loading />);

        expect(screen.getByTestId("components.loading")).toBeTruthy();
    });
});

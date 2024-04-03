import React from "react";
import { render, screen } from "@testing-library/react-native";

import { Input } from "../input";

describe("components/input/<Input />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders component properly", () => {
        render(
            <Input>
                <Input.Field placeholder='Placeholder' />
            </Input>,
        );

        expect(screen.getByTestId("components.input")).toBeTruthy();
        expect(screen.getByPlaceholderText("Placeholder")).toBeTruthy();
    });
});

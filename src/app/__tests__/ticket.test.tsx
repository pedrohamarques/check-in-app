import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";

import { DUMMY_USER_BADGE } from "@constants/dummy";

import Ticket from "../ticket";

jest.mock("expo-router");

const mockDummyData = { data: DUMMY_USER_BADGE };

const mockUseTicket = jest.fn();

const mockUseTicketValues = {
    handleSelectImage: jest.fn(),
    setExpandQRCode: jest.fn(),
    expandQRCode: true,
    handleRemoveCredentials: jest.fn(),
    badgeStore: mockDummyData,
    handleShare: jest.fn(),
};

jest.mock("@hooks/useTicket", () => ({
    useTicket: () => mockUseTicket(),
}));

describe("app/ticket/<Ticket />", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseTicket.mockReturnValue(mockUseTicketValues);
    });

    it("renders screen properly", () => {
        render(<Ticket />);

        expect(screen.getByTestId("app.ticket.header")).toBeTruthy();
        expect(screen.getByTestId("app.ticket.credential")).toBeTruthy();
        expect(screen.getByTestId("app.ticket.double-down-image")).toBeTruthy();

        expect(screen.getByText("Compartilhar credencial")).toBeTruthy();
        expect(
            screen.getByText(
                "Mostre ao mundo que você vai participar do Some Event!",
            ),
        ).toBeTruthy();

        expect(screen.getByTestId("app.ticket.button")).toBeTruthy();
        expect(screen.getByText("Remover ingresso")).toBeTruthy();

        expect(screen.getByTestId("app.ticket.modal")).toBeTruthy();
        expect(screen.getByText("Fechar")).toBeTruthy();

        expect(screen.queryByTestId("app.ticket.redirect")).toBeNull();
    });

    it("redirects to home screen when there is no checkInURL", () => {
        mockUseTicket.mockReturnValueOnce({
            ...mockUseTicketValues,
            badgeStore: {},
        });
        render(<Ticket />);

        expect(screen.queryByTestId("app.ticket.header")).toBeNull();
        expect(screen.queryByTestId("app.ticket.credential")).toBeNull();
        expect(screen.queryByTestId("app.ticket.double-down-image")).toBeNull();

        expect(screen.queryByText("Compartilhar credencial")).toBeNull();
        expect(
            screen.queryByText(
                "Mostre ao mundo que você vai participar do Some Event!",
            ),
        ).toBeNull();

        expect(screen.queryByTestId("app.ticket.button")).toBeNull();
        expect(screen.queryByText("Remover ingresso")).toBeNull();

        expect(screen.queryByTestId("app.ticket.modal")).toBeNull();
        expect(screen.queryByText("Fechar")).toBeNull();

        expect(screen.getByTestId("app.ticket.redirect")).toBeTruthy();
    });

    it("calls handleShare when share button is pressed", () => {
        render(<Ticket />);

        fireEvent.press(screen.getByTestId("app.ticket.button"));

        expect(mockUseTicketValues.handleShare).toHaveBeenCalledTimes(1);
    });

    it("calls handleRemoveCredentials when remove credentials button is pressed", () => {
        render(<Ticket />);

        fireEvent.press(screen.getByText("Remover ingresso"));

        expect(
            mockUseTicketValues.handleRemoveCredentials,
        ).toHaveBeenCalledTimes(1);
    });

    it("calls setExpandQRCode when modal button is pressed", () => {
        render(<Ticket />);

        fireEvent.press(screen.getByText("Fechar"));

        expect(mockUseTicketValues.setExpandQRCode).toHaveBeenCalledTimes(1);
    });
});

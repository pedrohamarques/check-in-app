import { Alert, Share } from "react-native";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useTicket } from "@hooks/useTicket";

const spyAlert = jest.spyOn(Alert, "alert");
const spyShare = jest.spyOn(Share, "share");

const mockSave = jest.fn();
const mockRemove = jest.fn();
const mockUpdateAvatar = jest.fn();

jest.mock("@stores/badge-store", () => ({
    useBadgeStore: () => ({
        save: () => mockSave(),
        remove: () => mockRemove(),
        updateAvatar: () => mockUpdateAvatar(),
        data: {
            checkInURL: "someData",
        },
    }),
}));

const mockLaunchImage = jest.fn();

jest.mock("expo-image-picker", () => ({
    ...jest.requireActual("expo-image-picker"),
    launchImageLibraryAsync: () => mockLaunchImage(),
}));

describe("hooks/useTicket", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("updates the avatar when handleSelectImage is called successfully", async () => {
        mockLaunchImage.mockResolvedValueOnce({
            assets: [{ uri: "somePath" }],
        });

        const { result } = renderHook(() => useTicket());

        await act(() => result.current.handleSelectImage());

        await waitFor(() => expect(mockLaunchImage).toHaveBeenCalledTimes(1));

        expect(mockUpdateAvatar).toHaveBeenCalledTimes(1);

        expect(spyAlert).not.toHaveBeenCalled();
    });

    it("updates the avatar when handleSelectImage is called successfully", async () => {
        mockLaunchImage.mockRejectedValueOnce(new Error("error"));

        const { result } = renderHook(() => useTicket());

        await act(() => result.current.handleSelectImage());

        await waitFor(() => expect(mockLaunchImage).toHaveBeenCalledTimes(1));

        expect(mockUpdateAvatar).not.toHaveBeenCalledTimes(1);

        await waitFor(() => expect(spyAlert).toHaveBeenCalledTimes(1));

        expect(spyAlert).toHaveBeenCalledWith(
            "Foto",
            "Não foi possível selecionar a imagem",
        );
    });

    it("removes credentials from the store when handleRemoveCredentials is called", () => {
        const { result } = renderHook(() => useTicket());

        act(() => result.current.handleRemoveCredentials());

        expect(mockRemove).toHaveBeenCalledTimes(1);
    });

    it("shares the credential when there is a checkin url when handleShare is called", async () => {
        spyShare.mockResolvedValueOnce({ action: "sharedAction" });
        const { result } = renderHook(() => useTicket());

        await act(() => result.current.handleShare());

        await waitFor(() => expect(spyShare).toHaveBeenCalledTimes(1));
        expect(spyShare).toHaveBeenCalledWith({ message: "someData" });

        expect(spyAlert).not.toHaveBeenCalled();
    });

    it("calls alert and does not share the credential when there is a checkin url when handleShare is called", async () => {
        spyShare.mockRejectedValueOnce(new Error("error"));
        const { result } = renderHook(() => useTicket());

        await act(() => result.current.handleShare());

        await waitFor(() => expect(spyShare).toHaveBeenCalledTimes(1));

        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith(
            "Compartilhar",
            "Não foi possível compartilhar",
        );
    });
});

import { act, renderHook, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";

import { useHome } from "@hooks/useHome";

const mockGet = jest.fn();

jest.mock("@services/api", () => ({
    api: {
        get: () => mockGet(),
    },
}));

const spyAlert = jest.spyOn(Alert, "alert");

const mockSave = jest.fn();

jest.mock("@stores/badge-store", () => ({
    useBadgeStore: () => ({
        save: () => mockSave(),
    }),
}));

const mockApiGetValue = {
    data: {
        badge: {
            checkInURL: "someUrl",
            email: "someEmail",
            name: "someName",
            eventTitle: "someEvent",
        },
    },
};

describe("hooks/useHome", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls Alert when the code is not provided when handleAccessCredentials is called", async () => {
        const { result } = renderHook(() => useHome());

        await act(() => result.current.handleAccessCredentials());

        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith(
            "Credencial",
            "Informe o credencial do ingresso!",
        );
    });

    it("requests the badge info and saves it to the store", async () => {
        mockGet.mockResolvedValueOnce(mockApiGetValue);
        const code = "123";

        const { result } = renderHook(() => useHome());

        act(() => result.current.setCode(code));

        await act(() => result.current.handleAccessCredentials());

        await waitFor(() => expect(mockGet).toHaveBeenCalledTimes(1));

        expect(mockSave).toHaveBeenCalledTimes(1);

        expect(spyAlert).not.toHaveBeenCalled();
    });

    it("does not save the data in the store when request is not successful", async () => {
        mockGet.mockRejectedValueOnce(new Error("error"));
        const code = "123";

        const { result } = renderHook(() => useHome());

        act(() => result.current.setCode(code));

        await act(() => result.current.handleAccessCredentials());

        await waitFor(() => expect(mockGet).toHaveBeenCalledTimes(1));

        expect(mockSave).not.toHaveBeenCalled();

        expect(spyAlert).toHaveBeenCalledTimes(1);
        expect(spyAlert).toHaveBeenCalledWith(
            "Credencial",
            "Credencial não encontrada",
        );
    });
});

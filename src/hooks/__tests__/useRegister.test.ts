import { Alert } from "react-native";
import { act, renderHook, waitFor } from "@testing-library/react-native";

import { useRegister } from "@hooks/useRegister";
import { DUMMY_USER_BADGE } from "@constants/dummy";

const mockRouterPush = jest.fn();

jest.mock("expo-router", () => ({
    router: {
        push: () => mockRouterPush(),
    },
}));

const spyAlert = jest.spyOn(Alert, "alert");

const mockGet = jest.fn();
const mockPost = jest.fn();

jest.mock("@services/api", () => ({
    api: {
        get: () => mockGet(),
        post: () => mockPost(),
    },
}));

const mockSave = jest.fn();

jest.mock("@stores/badge-store", () => ({
    useBadgeStore: () => ({
        save: () => mockSave(),
    }),
}));

describe("hooks/useRegister", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls Alert when name is not provided", async () => {
        const { result } = renderHook(() => useRegister());

        act(() => result.current.setEmail("teste@email.com"));

        await act(() => result.current.handleRegister());

        expect(spyAlert).toHaveBeenCalled();
        expect(spyAlert).toHaveBeenNthCalledWith(
            1,
            "Inscrição",
            "Preencha todos os campos!",
        );
    });

    it("calls Alert when email is not provided", async () => {
        const { result } = renderHook(() => useRegister());

        act(() => result.current.setName("John"));

        await act(() => result.current.handleRegister());

        expect(spyAlert).toHaveBeenCalled();
        expect(spyAlert).toHaveBeenNthCalledWith(
            1,
            "Inscrição",
            "Preencha todos os campos!",
        );
    });

    it("creates the subscription when name and email is provided and the request is successful and navigates to ticket screen", async () => {
        mockPost.mockResolvedValueOnce({ data: { attendeeId: "1" } });
        mockGet.mockResolvedValueOnce({ data: { badge: DUMMY_USER_BADGE } });

        const { result } = renderHook(() => useRegister());

        act(() => result.current.setName("John"));
        act(() => result.current.setEmail("teste@email.com"));

        await act(() => result.current.handleRegister());

        await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));

        await waitFor(() => expect(mockGet).toHaveBeenCalledTimes(1));

        expect(mockSave).toHaveBeenCalledTimes(1);

        await waitFor(() => expect(spyAlert).toHaveBeenCalledTimes(1));

        expect(spyAlert).toHaveBeenCalledWith(
            "Inscrição",
            "Inscrição realizada com sucesso!",
            [{ text: "Ok", onPress: expect.any(Function) }],
        );

        await act(() => spyAlert.mock.calls[0][2]?.[0].onPress?.());

        expect(mockRouterPush).toHaveBeenCalledTimes(1);
    });

    it("does not create the subscription when one of the requests is not successful and does not navigate to ticket screen", async () => {
        mockPost.mockRejectedValueOnce(new Error("Error"));
        mockGet.mockResolvedValueOnce({ data: { badge: DUMMY_USER_BADGE } });

        const { result } = renderHook(() => useRegister());

        act(() => result.current.setName("John"));
        act(() => result.current.setEmail("teste@email.com"));

        await act(() => result.current.handleRegister());

        await waitFor(() => expect(mockPost).toHaveBeenCalledTimes(1));

        expect(mockGet).not.toHaveBeenCalled();

        expect(mockSave).not.toHaveBeenCalled();

        expect(spyAlert).toHaveBeenCalledWith(
            "Inscrição",
            "Não foi possível fazer a inscrição",
        );

        expect(mockRouterPush).not.toHaveBeenCalled();
    });
});

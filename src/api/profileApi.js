import { apiGet } from "../lib/api";

export const getUserProfile = async () => {
    const res = await apiGet("/user/profile");
    return res.data;
};

export const updateUserProfile = async (formData) => {
    const res = await apiClient.patch("/user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};


import { apiGet, apiPatch, apiPut } from "../lib/api";

// GET profile
export const getUserProfile = () => {
    return apiGet("/user/profile");
};

// UPDATE profile (form-data)
export const updateUserProfile = (formData) => {
    return apiPut("/user/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

// CHANGE PASSWORD
export const changePassword = (data) => {
    return apiPatch("/user/auth/change-password", data);
};






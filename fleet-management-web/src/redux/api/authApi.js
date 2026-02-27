import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register-tenant',
                method: 'POST',
                body: userData,
            }),
        }),
        getProfile: builder.query({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        changePassword: builder.mutation({
            query: (passwords) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: passwords,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery, useChangePasswordMutation } = authApi;

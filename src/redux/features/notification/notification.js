import { baseApi } from "../../baseApi/baseApi";

const notification = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: () => ({
                url: "/notification",
                method: "GET",
                providesTags: ["Setting"],
            }),
        }),
    }),
});

export const { useGetAllNotificationQuery } = notification;
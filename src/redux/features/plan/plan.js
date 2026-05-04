import { baseApi } from "../../baseApi/baseApi";

const planApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPlans: builder.query({
            query: () => ({
                url: "/plan/plans",
                method: "GET",
                providesTags: ["Plan"],
            }),
        }),
    }),
});

export const { useGetAllPlansQuery } = planApi;
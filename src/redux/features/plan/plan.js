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
        createMealPlan: builder.mutation({
            query: (data) => ({
                url: "/plan/create-plan",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Plan"],
        }),
    }),
});

export const { useGetAllPlansQuery , useCreateMealPlanMutation } = planApi;
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
        deletePlanSub: builder.mutation({
            query: (id) => ({
                url: `/plan/delete-plan/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Plan"],
        }),
        getAllSubscriberList: builder.query({
            query: () => ({
                url: "/dashboard/subscriber-list",
                method: "GET",
                providesTags: ["Plan"],
            }),
        }),
    }),
});

export const {
    useGetAllPlansQuery,
    useCreateMealPlanMutation,
    useDeletePlanSubMutation,
    useGetAllSubscriberListQuery } = planApi;
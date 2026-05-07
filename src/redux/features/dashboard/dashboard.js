import { baseApi } from "../../baseApi/baseApi";

const dashbaordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStatus: builder.query({
            query: () => ({
                url: `/dashboard/stats`,
                method: "GET",
            }),
        }),
        getSubscriptionTier: builder.query({
            query: () => ({
                url: `/dashboard/subscription-stats`,
                method: "GET",
            })
        }),
        getBloodTypesGrops: builder.query({
            query: () => ({
                url: "/dashboard/blood-group-stats",
                method: "GET"
            })
        }),
        getRechartStatus: builder.query({
            query: () => ({
                url: "/dashboard/get-rechart-stats",
                method: "GET"
            })
        }),
    })
})

export const {
    useGetDashboardStatusQuery,
    useGetSubscriptionTierQuery,
    useGetBloodTypesGropsQuery,
    useGetRechartStatusQuery

} = dashbaordApi;
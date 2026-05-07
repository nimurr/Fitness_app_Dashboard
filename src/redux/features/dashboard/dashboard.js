import { baseApi } from "../../baseApi/baseApi";

const dashbaordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getStatus: builder.query({
            query: () => ({
                url: `/dash`,
                method: "GET",
            }),
        }),
    })
})

export const {
    useGetStatusQuery

} = dashbaordApi;
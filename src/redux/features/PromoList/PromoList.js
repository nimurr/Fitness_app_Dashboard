import { baseApi } from "../../baseApi/baseApi";

const promoListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReport: builder.mutation({
            query: (data) => ({
                url: "/promocode",
                method: "POST",
                body: data
            })
        }),

    })
})

export const {
    useCreateReportMutation


} = promoListApi;
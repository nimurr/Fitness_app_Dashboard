import { baseApi } from "../../baseApi/baseApi";

const reportAndIssue = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReport: builder.mutation({
            query: (data) => ({
                url: "/report/create-report",
                method: "POST",
                body: data
            })
        }),
        getReoprtsAll: builder.query({
            query: () => ({
                url: "/report",
                method: "GET",
            })
        }),
        deleteReport: builder.mutation({
            query: (id) => ({
                url: `/report/delete?reportId=${id}`,
                method: "DELETE",
            })
        }),
        updateStatus: builder.mutation({
            query: ({ data, id }) => ({
                url: `/report/update-status/${id}`,
                method: "PATCH",
                body: data
            })
        }),
    })
})

export const {
    useCreateReportMutation,
    useGetReoprtsAllQuery,
    useDeleteReportMutation,
    useUpdateStatusMutation



} = reportAndIssue;
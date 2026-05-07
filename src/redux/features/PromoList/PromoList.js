import { baseApi } from "../../baseApi/baseApi";

const promoListApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPromoCode: builder.mutation({
      query: (data) => ({
        url: "/promocode",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PromoCode"],
    }),
    updatePromoCode: builder.mutation({
      query: ({ data, promocodeId }) => ({
        url: `/promocode/${promocodeId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["PromoCode"],
    }),
    deletePromoCode: builder.mutation({
      query: ({ promocodeId }) => ({
        url: `/promocode/${promocodeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PromoCode"],
    }),
    getAllPromoCodes: builder.query({
      query: ({ page, limit }) => ({
        url: `/promocode?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["PromoCode"],
    }),
  }),
});

export const {
  useCreatePromoCodeMutation,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
  useGetAllPromoCodesQuery,
} = promoListApi;
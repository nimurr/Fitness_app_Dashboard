import { baseApi } from "../../baseApi/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSettings: builder.query({
      query: (status) => ({
        url: `/${status}`,
        method: "GET",
        providesTags: ["Setting"],
      }),
    }),

    updatePrivacyPolicyAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/privacy/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    updateTramsAndConditionsAll: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/terms/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),

    updateAboutUs: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/about/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Setting"],
    }),


    getUserProfile: builder.query({
      query: () => ({
        url: "/get-settings-data",
        method: "GET",
        providesTags: ["Profile"],
      }),
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/update-profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),


    getAllNotification: builder.query({
      query: () => ({
        url: "/notifications",
        method: "GET",
        providesTags: ["Notification"],
      }),
    }),

    getAllFaq: builder.query({
      query: () => ({
        url: "/faq/all-faqs",
        method: "GET",
      }),
    }),
    addFaqMain: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: (data) => ({
        url: "/faq/add-faq",
        method: "POST",
        body: data,
      }),
    }),
    deleteFaq: builder.mutation({  // ✅ FIXED: Use mutation instead of query
      query: ({ id }) => ({
        url: `/faq/delete-faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Setting"],
    }),


  }),
});

export const {
  useGetAllSettingsQuery,

  useUpdatePrivacyPolicyAllMutation, // ✅ FIXED: Mutation hook 
  useUpdateTramsAndConditionsAllMutation,
  useUpdateAboutUsMutation,

  useGetUserProfileQuery,
  useUpdateProfileMutation,

  useGetAllNotificationQuery,

  useGetAllFaqQuery,
  useAddFaqMainMutation,
  useDeleteFaqMutation,

} = settingApi;

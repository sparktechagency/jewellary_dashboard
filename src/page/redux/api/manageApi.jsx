import { baseApi } from "./baseApi";

const manage = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: ({ page }) => {
        return {
          url: `/info?page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAppointment: builder.query({
      query: () => {
        return {
          url: `/admin/appointment`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addManage: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/info",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    getFaq: builder.query({
      query: () => {
        return {
          url: `/faq`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getNotification: builder.query({
      query: () => {
        return {
          url: `/admin/dashboard/notifications`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addFaq: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/faq",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    updateFaq: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/faq`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    deleteFaq: builder.mutation({
      query: (data) => ({
        url: `/admin/faq`,
        method: "DELETE",
        body: { id: data },
      }),
      invalidatesTags: ["updateProfile"],
    }),

    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `/admin/categories`,
        method: "DELETE",
        body: { id: data },
      }),
      invalidatesTags: ["updateProfile"],
    }),

    getContact: builder.query({
      query: ({ page, limit }) => {
        return {
          url: `/admin/contact?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getDashborad: builder.query({
      query: (params) => {

        return {
          url: `/admin/dashboard`,
          method: "GET",
          params,
        };
      },
      providesTags: ["updateProfile"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useAddManageMutation,
  useGetAppointmentQuery,
  useGetFaqQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
  useGetContactQuery,
  useDeleteCategoryMutation,
  useGetNotificationQuery,
  useGetDashboradQuery
} = manage;

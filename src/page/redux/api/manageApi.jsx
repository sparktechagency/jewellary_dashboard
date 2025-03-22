
import { baseApi } from "./baseApi";

const manage = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAbout: builder.query({
      query: ({page}) => {
        return {
          url: `/info?page=${page}`,
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

 

  }),
});

export const {
useGetAboutQuery,
useAddManageMutation

} = manage;

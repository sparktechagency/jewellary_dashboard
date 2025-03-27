
import { baseApi } from "./baseApi";

const order = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getOrder: builder.query({
      query: ({limit, page}) => {
        return {
          url: `/admin/orders?type=ready-made&limit=${limit}&page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOrderRepair: builder.query({
      query: ({page,limit}) => {
        return {
          url: `/admin/orders?type=custom&limit=${limit}&page=${page}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    updateOrder: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/orders`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    

  }),
});

export const {
useGetOrderQuery,
useUpdateOrderMutation,
useGetOrderRepairQuery

} = order;

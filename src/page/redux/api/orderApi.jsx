
import { baseApi } from "./baseApi";

const order = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getOrder: builder.query({
      query: () => {
        return {
          url: `/admin/orders?type=ready-made`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getOrderRepair: builder.query({
      query: () => {
        return {
          url: `/admin/orders?type=custom`,
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

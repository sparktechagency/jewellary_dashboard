import { baseApi } from "./baseApi";

const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getCategory: builder.query({
      query: () => {
        return {
          url: `/categories`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getAllProduct: builder.query({
      query: () => {
        return {
          url: `/products`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    getSubCategory: builder.query({
      query: ({id}) => {
        return {
          url: `/categories/${id}`,
          method: "GET",
        };
      },
      providesTags: ["updateProfile"],
    }),

    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/categories",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

      updateCategory: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/categories`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

    

    updateProduct: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/products`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),
    
    addProduct: builder.mutation({
      query: (data) => {
        return {
          url: "/admin/products",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["updateProfile"],
    }),

   //  getAllNewHostUser: builder.query({
   //    query: () => {
   //      return {
   //        url: `/dashboard/get-all-add-car-req`,
   //        method: "GET",
   //      };
   //    },
   //    providesTags: ["host"],
   //  }),

    

   //  getSingleHostreq: builder.query({
   //    query: ({ carId }) => {
   //      return {
   //        url: `/car/get-single-car-details?carId=${carId}`,
   //        method: "GET",
   //      };
   //    },
   //    providesTags: ["newHost"],
   //  }),

   //  approveHostRequest: builder.mutation({
   //    query: ({ carId, status }) => {
   //      return {
   //        url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
   //        method: "PATCH",
   //      };
   //    },
   //    invalidatesTags: ["host"],
   //  }),

   //  caneleHostRequest: builder.mutation({
   //    query: ({ carId, status }) => {
   //      return {
   //        url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
   //        method: "PATCH",
   //      };
   //    },
   //    invalidatesTags: ["host"],
   //  }),

    // approveHostRequest: builder.mutation({
    //   query: ({ carId, status }) => {
    //     return {
    //       url: `/dashboard/approve-car?carId=${carId}&status=${status}`,
    //       method: "PATCH",
    //     };

    //   },
    // }),
  }),
});

export const {
useGetCategoryQuery,
useAddCategoryMutation,
useGetSubCategoryQuery,
useAddProductMutation,
useGetAllProductQuery,
useUpdateCategoryMutation,
useUpdateProductMutation
} = category;

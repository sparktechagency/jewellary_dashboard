import { baseApi } from "./baseApi";


const dashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // loginAdmin: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: "/auth/login",
        //             method: "POST",
        //             body: data,
        //         };
        //     },
        // }),

        getChartsInfo: builder.query({
            query: () => {
                return {
                    url: "/admin/dashboard",
                    method: "GET",
                };
            },
        })
    })
})

export const {
    useGetChartsInfoQuery,
} = dashboardApi;

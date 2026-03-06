import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Form } from "../types/form.types";

export const formsApi = createApi({
  reducerPath: "formsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/graphql",
    headers: {
      "Content-Type": "application/json",
    },
  }),

  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query {
              forms {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                }
              }
            }
          `,
        },
      }),
      transformResponse: (res: any) => res.data.forms,
    }),

    getForm: builder.query<Form, string>({
      query: (id) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query($id: ID!) {
              form(id: $id) {
                id
                title
                description
                questions {
                  id
                  title
                  type
                  options
                }
              }
            }
          `,
          variables: { id },
        },
      }),
      transformResponse: (res: any) => res.data.form,
    }),
  }),
});

export const { useGetFormsQuery, useGetFormQuery } = formsApi;

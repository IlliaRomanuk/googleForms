import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Form, FormResponse } from "../types/form.types";

export const formsApi = createApi({
  reducerPath: "formsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/graphql",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: "",
        method: "POST",
        body: {
          query: `
            {
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
            query($id:ID!) {
              form(id:$id) {
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

    createForm: builder.mutation<Form, any>({
      query: (variables) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation($title:String!, $description:String, $questions:[QuestionInput]) {
              createForm(title:$title, description:$description, questions:$questions) {
                id
                title
              }
            }
          `,
          variables,
        },
      }),
      transformResponse: (res: any) => res.data.createForm,
    }),

    submitResponse: builder.mutation<FormResponse, any>({
      query: (variables) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            mutation($formId:ID!, $answers:[AnswerInput]) {
              submitResponse(formId:$formId, answers:$answers) {
                id
                formId
                answers {
                  questionId
                  value
                }
              }
            }
          `,
          variables,
        },
      }),
      transformResponse: (res: any) => res.data.submitResponse,
    }),

    getResponses: builder.query<FormResponse[], string>({
      query: (formId) => ({
        url: "",
        method: "POST",
        body: {
          query: `
            query($formId:ID!) {
              responses(formId:$formId) {
                id
                formId
                answers {
                  questionId
                  value
                }
              }
            }
          `,
          variables: { formId },
        },
      }),
      transformResponse: (res: any) => res.data.responses,
    }),
  }),
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useCreateFormMutation,
  useSubmitResponseMutation,
  useGetResponsesQuery,
} = formsApi;

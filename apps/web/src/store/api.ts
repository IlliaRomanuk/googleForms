// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// interface QuestionInput {
//   title: string;
//   type: string;
//   options?: string[];
// }

// interface Form {
//   id: string;
//   title: string;
//   description?: string;
//   questions: QuestionInput[];
// }

// interface Answer {
//   questionId: string;
//   value: string;
// }

// interface FormResponse {
//   id: string;
//   formId: string;
//   answers: Answer[];
// }

// export const formsApi = createApi({
//   reducerPath: "formsApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/graphql", fetchFn: async (input, init) => {
//     // отправляем POST-запрос для GraphQL
//     const res = await fetch(input as string, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: init?.body,
//     });
//     return res.json();
//   }}),
//   endpoints: (builder) => ({
//     getForms: builder.query<Form[], void>({
//       query: () => ({
//         body: JSON.stringify({ query: `{ forms { id title description questions { id title type options } } }` }),
//       }),
//       transformResponse: (res: any) => res.data.forms,
//     }),
//     getForm: builder.query<Form, string>({
//       query: (id) => ({
//         body: JSON.stringify({ query: `{ form(id:"${id}") { id title description questions { id title type options } } }` }),
//       }),
//       transformResponse: (res: any) => res.data.form,
//     }),
//     createForm: builder.mutation<Form, Partial<Form>>({
//       query: (form) => ({
//         body: JSON.stringify({ query: `
//           mutation($title:String!, $description:String, $questions:[QuestionInput!]!) {
//             createForm(title:$title, description:$description, questions:$questions) {
//               id title description questions { id title type options }
//             }
//           }
//         `,
//         variables: form }),
//       }),
//       transformResponse: (res: any) => res.data.createForm,
//     }),
//     submitResponse: builder.mutation<FormResponse, { formId: string; answers: Answer[] }>({
//       query: ({ formId, answers }) => ({
//         body: JSON.stringify({ query: `
//           mutation($formId:ID!, $answers:[AnswerInput!]!) {
//             submitResponse(formId:$formId, answers:$answers) {
//               id formId answers { questionId value }
//             }
//           }
//         `,
//         variables: { formId, answers } }),
//       }),
//       transformResponse: (res: any) => res.data.submitResponse,
//     }),
//   }),
// });

// export const {
//   useGetFormsQuery,
//   useGetFormQuery,
//   useCreateFormMutation,
//   useSubmitResponseMutation,
// } = formsApi;
// store/api.ts
// store/api.ts
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
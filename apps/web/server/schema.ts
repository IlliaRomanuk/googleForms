import { gql } from "apollo-server";
import { forms, responses } from "./data";
import { v4 as uuidv4 } from "uuid";

// GraphQL типы
export const typeDefs = gql`
  enum QuestionType {
    TEXT
    MULTIPLE_CHOICE
    CHECKBOX
    DATE
  }

  type Question {
    id: ID!
    title: String!
    type: QuestionType!
    options: [String]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: String
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  input QuestionInput {
    title: String!
    type: QuestionType!
    options: [String]
  }

  input AnswerInput {
    questionId: ID!
    value: String
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput!]!): Form!
    submitResponse(formId: ID!, answers: [AnswerInput!]!): Response!
  }
`;

// Резолверы
export const resolvers = {
  Query: {
    forms: () => forms,
    form: (_: any, { id }: { id: string }) => forms.find(f => f.id === id),
    responses: (_: any, { formId }: { formId: string }) =>
      responses.filter(r => r.formId === formId),
  },
  Mutation: {
    createForm: (_: any, { title, description, questions }: any) => {
      const newForm = { id: uuidv4(), title, description, questions };
      forms.push(newForm);
      return newForm;
    },
    submitResponse: (_: any, { formId, answers }: any) => {
      const newResponse = { id: uuidv4(), formId, answers };
      responses.push(newResponse);
      return newResponse;
    },
  },
};
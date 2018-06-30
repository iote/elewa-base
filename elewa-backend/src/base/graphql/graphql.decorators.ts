import { createGraphqlGuard } from "./decorator/graphql.gaurd";

export const Query    = createGraphqlGuard("Query");
export const Mutation = createGraphqlGuard("Mutation");

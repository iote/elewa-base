import { ReflectMetadata } from "@nestjs/common";
import { BearerToken } from "elewa-shared/token/bearer-token.interface";
import _ = require("underscore");
import { __Field } from "graphql";

/**
 * Custom Decorator that enables a resolver to execute a query.
 *
 *  Note: Only use this for Queries, not for ResovleProperty!
 *
 * Inspired by https://github.com/nestjs/graphql/blob/master/lib/decorators/resolvers.decorators.ts
 */
export function createGraphqlGuard(name: string) {
  return function (resolver?: string)
  {
    return function (
      target: Object,
      key: string | symbol,
      descriptor: TypedPropertyDescriptor<Function>
    ) {
      // 1. Set the Graphql Resolver Type and name - See Nest Query-Resolver.
      ReflectMetadata("graphql:resolver_type", resolver || name)(
        target,
        key,
        descriptor
      );
      ReflectMetadata("graphql:resolver_name", name)(target, key, descriptor);

      const toExecute = descriptor.value;
      // 1. Change the Descriptor Value to Reflect the changes
      descriptor.value = async function (...args: any[]) {
        console.log("Graphql ClaimsGaurd: Checking if User is Authorised.");

        // Get the context from the parameters.
        args[2].bearer = await args[2].bearer;
        // Get code structures we need to reflect on - The ones annotated with RequireClaims.
        _claimsGaurd(args[2].bearer, target.constructor, target[key]);

        return toExecute.apply(this, args);
      };
    };
  }
}

/** Protects endpoint from unauthored requests. */
function _claimsGaurd(bearer: BearerToken, classTarget, methodTarget) {
  const neededClaims = _getNeededClaims(classTarget, methodTarget);

  if (_tokenHasClaims(bearer, <string[]>neededClaims)) return true;
  else throw new Error("Forbidden resource");
}

/** Aggregates the claims needed to run the targetted method.
 *  Combines claim requirements of class and method. */
function _getNeededClaims(classTarget, methodTarget) {
  // Get claims on controller / graphql resolver level
  const classClaims = Reflect.getMetadata("claims", classTarget) || [];
  // Get claims on method / property level
  const methodClaims = Reflect.getMetadata("claims", methodTarget) || [];

  return _.union(classClaims, methodClaims);
}

/**
 * Logic that determines how claims are going to be used.
 *
 * Do we require a user to have all claims for that class and method? - Most restrictive 'AND'-like approach.
 * Do we require a user to have only one of the claims on either class or method level - 'OR'-like appoach.
 *
 * We opt for the most restrictive one on our server.
 */
function _tokenHasClaims(token: BearerToken, claims: String[]) {
  // AND-approach - Needs all claims
  return claims.length === _.intersection(token.claims, claims).length
    ? _success()
    : _failure();

  // OR-approach - Needs only one claim
  //return _.intersection(token.claims, claims)
  //        .length > 0;
}
function _success() {
  console.log(
    "Graphql Guard Conditions Passed. Allowing Access.",
    "Query.decorator"
  );
  return true;
}

function _failure() {
  console.log(
    "Graphql Guard Conditions Failed or Token expired. Denying Access.",
    "Query.decorator"
  );
  return false;
}

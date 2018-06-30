import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule, GraphQLFactory } from "@nestjs/graphql";

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

import { ServerBootModule } from "./modules/_server-boot/server-boot.module";
import { AuthModule } from "./modules/auth/auth.module";
import { CurriculumModule } from "./modules/curriculum/curriculum.module";

import { AppController } from "./app.controller";

import { production } from "./base/config/production";
import { connString } from "./base/config/db.connectionstring";
import { GraphqlAuthExtractorService } from "./base/graphql/graphql-auth-extractor.service";

@Module({
  imports: [ MongooseModule.forRoot(connString),
             GraphQLModule,
             ServerBootModule,
             AuthModule,
             CurriculumModule ],
  controllers: [ AppController ],
  components: [],
})
export class ApplicationModule implements NestModule {
  
  constructor(private readonly graphQLFactory: GraphQLFactory,
              private _graphqlAuthExtractorService: GraphqlAuthExtractorService)
  { }

  configure(consumer: MiddlewaresConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.gql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

     // Dev Graphiql endpoint
     if(!production)
      consumer
        .apply(graphiqlExpress({ endpointURL: '/graphql' }))
        .forRoutes({ path: '/graphiql', method: RequestMethod.GET })

    consumer
      .apply(graphqlExpress(req => ({
        schema,
        rootValue: req,
        // Extracts the Bearer Token from the header. 
        // Needs to be inside of app context, therefore placed here.
        // After this, query.decorator and mutation.decorator will handle Guard so only when user has correct claim they can access the endpoints. 
        context: { bearer: this._graphqlAuthExtractorService.extractToken(req), request: req }
      })))
      .forRoutes({ path: "/graphql", method: RequestMethod.ALL });
  }

}

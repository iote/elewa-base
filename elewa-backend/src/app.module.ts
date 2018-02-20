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
  
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  configure(consumer: MiddlewaresConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.gql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

     // Dev Graphiql endpoint
     if(!production)
      consumer
        .apply(graphiqlExpress({ endpointURL: '/graphql' }))
        .forRoutes({ path: '/graphiql', method: RequestMethod.GET })

    consumer
      .apply(graphqlExpress(req => ({ schema, rootValue: req, context: req })))
        .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }

}

import { Module, MiddlewaresConsumer, NestModule, RequestMethod,} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { connString } from './base/config/db.connectionstring';

import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import { GraphQLModule, GraphQLFactory } from '@nestjs/graphql';

import { ServerBootModule } from './modules/_server-boot/server-boot.module';
import { CurriculumModule } from './modules/curriculum/curriculum.module';

import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { production } from './base/config/production';
import * as passport from 'passport';

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

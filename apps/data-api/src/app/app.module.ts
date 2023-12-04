import { Module } from '@nestjs/common';

import { UsersModule } from '@avans-project-cswp/backend/user';
import { AuthModule } from '@avans-project-cswp/backend/auth';

import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-project-cswp/shared/util-env';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          // console.log('is connected');
          Logger.verbose(
            `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
          );
        });
        connection._events.connected();
        return connection;
      },
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

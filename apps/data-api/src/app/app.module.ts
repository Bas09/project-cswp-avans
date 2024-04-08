import { Module } from '@nestjs/common';
import {
  UsersModule,
  PlaylistModule,
  SongModule,
  ArtistModule,
} from '@avans-project-cswp/backend/features';
import { AuthModule } from '@avans-project-cswp/backend/auth';
import { MongooseModule } from '@nestjs/mongoose';
import { environment } from '@avans-project-cswp/shared/util-env';
import { Logger } from '@nestjs/common';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    PlaylistModule,
    SongModule,
    ArtistModule,
    MongooseModule.forRoot(environment.MONGO_DB_CONNECTION_STRING, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          Logger.verbose(
            `Mongoose db connected to ${environment.MONGO_DB_CONNECTION_STRING}`
          );
        });
        connection._events.connected();
        return connection;
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

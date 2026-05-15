import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './core/db/data-source';
import { LostPetsModule } from './lost-pets/lost-pets.module';
import { FoundPetsModule } from './found-pets/found-pets.module';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,

      useFactory: async () => ({
        store: await redisStore({
          socket: {
            host: 'redis',
            port: 6379,
          },
          ttl: 60,
        }),
      }),
    }),

    EmailModule,
    LostPetsModule,
    FoundPetsModule,

    TypeOrmModule.forRoot(dataSourceOptions),
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENV_VAR_NAMES } from 'src/constant/env';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>(ENV_VAR_NAMES.DB_HOST)}:${configService.get<string>(
          ENV_VAR_NAMES.DB_PORT,
        )}/${configService.get<string>(ENV_VAR_NAMES.DB_NAME)}`,
        user: configService.get<string>(ENV_VAR_NAMES.DB_USER),
        pass: configService.get<string>(ENV_VAR_NAMES.DB_PASSWORD),
      }),
    }),
  ],
})
export class DatabaseModule {}

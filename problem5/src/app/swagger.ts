import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const SWAGGER_UI_INFO = {
  title: 'Challenger swagger',
  description: 'Challenger swagger',
  version: '1.0.0',
};

export const setupSwagger = (app: INestApplication): void => {
  const config = new DocumentBuilder()
    .setTitle(SWAGGER_UI_INFO.title)
    .setDescription(SWAGGER_UI_INFO.description)
    .setVersion(SWAGGER_UI_INFO.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
};

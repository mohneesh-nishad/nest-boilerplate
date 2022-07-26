import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { AppModule } from './app.module';
import type {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from 'src/common/configs/config.interface';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
// import { contentParser } from 'fastify-multer';

async function bootstrap() {

  const fastifyOptions = {
    logger: {
      redact: ['req.headers.authorization'],
      level: 'error',
      serializers: {
        req(request) {
          return {
            method: request.method,
            url: request.url,
            // headers: request.headers,
            hostname: request.hostname,
            remoteAddress: request.ip,
            remotePort: request.socket.remotePort
          }
        }
      }
    }
  }
  // try {
  const server = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(fastifyOptions));
  // server.register(contentParser);

  // Validation
  server.useGlobalPipes(new ValidationPipe());


  // Prisma Client Exception Filter for unhandled exceptions
  // const { httpAdapter } = server.get(HttpAdapterHost);
  // server.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = server.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');

  // Swagger Api
  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title || 'Nestjs')
      .setDescription(swaggerConfig.description || 'The nestjs API description')
      .setVersion(swaggerConfig.version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(server, options);

    SwaggerModule.setup(swaggerConfig.path || 'api', server, document);
  }

  // Cors
  // if (corsConfig.enabled) {
  //   // server.enableCors();
  // }
  server.enableShutdownHooks()

  const PORT = parseInt(process.env.PORT)
  //* 0.0.0.0 fro docker network compatibility.
  const SERVER_ADDRESS = '0.0.0.0'

  await server.listen(PORT, SERVER_ADDRESS, (err, address) => {
    if (err) {
      console.log('error from listener')
      console.log(err);
      process.exit(1);
    } else {
      console.log(`Application is running on: ${address}`);
    }
  })
  // }
  // catch (error) {
  //   Logger.error(`❌  Error starting server internal, ${error}`, '', 'Bootstrap', false)
  //   process.exit()
  // }
}

bootstrap().catch(e => {
  Logger.error(`❌  Error starting server external, ${e}`, '', 'Bootstrap', false)
  process.exit(1)
  throw e
});

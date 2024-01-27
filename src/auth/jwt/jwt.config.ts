import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

// configuração pro o modulo Jwt assíncrona
export const jwtOptions: JwtModuleAsyncOptions = {
  // Importa o configModule NestJS pra acessa as variaveis de ambiente
  imports: [ConfigModule],
  // Injetando o ConfigService pra acessa as configs
  inject: [ConfigService],

  // Factory que cria as opções de configuração para o módulo Jwt
  useFactory: (configService: ConfigService) => ({
    // Pega a chave pra verificar os tokens , que foi salva no env
    secret: configService.get('JWT_SECRET_KEY'),
    // opções, definindo tempo que foi feito no .env
    signOptions: {
      expiresIn: configService.get('JWT_EXPIRATION'),
    },
  }),
};

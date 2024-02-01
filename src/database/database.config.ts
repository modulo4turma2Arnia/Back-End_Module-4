// Esses módulos e serviços são geralmente usados no NestJS para lidar com configurações da aplicação.
// ConfigModule permite que você configure suas variáveis de ambiente de maneira organizada,
// enquanto ConfigService facilita a obtenção dessas configurações em outras partes do seu código.
import { ConfigModule, ConfigService } from '@nestjs/config';

// Essas importações estão relacionadas ao TypeORM, um ORM (Object-Relational Mapping) para TypeScript e JavaScript.
// TypeOrmModuleAsyncOptions é uma opção assíncrona para configurar o TypeORM no contexto do NestJS,
// enquanto PostgresConnectionOptions contém as opções específicas para a conexão com um banco de dados PostgreSQL.
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ProductEntity, UserEntity, JewelryEntity } from './entities';

// Configurando as opções assíncronas para o TypeORM usando o NestJS.
export default <TypeOrmModuleAsyncOptions>{
  // Importa o ConfigModule para utilizar as configurações de ambiente.
  imports: [ConfigModule],

  // Injeta o ConfigService para acessar as configurações durante a configuração assíncrona do TypeORM.
  inject: [ConfigService],

  // Função assíncrona que retorna as opções de conexão do TypeORM configuradas com base nas variáveis de ambiente.
  useFactory: async (
    configService: ConfigService,
  ): Promise<PostgresConnectionOptions> => {
    return <PostgresConnectionOptions>{
      // Tipo de banco de dados utilizado (PostgreSQL neste caso).
      type: 'postgres',

      // Obtém as informações de host, porta, usuário, senha e nome do banco de dados a partir das variáveis de ambiente.
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),

      // Lista de entidades (modelos) do TypeORM. Pode ser estendida conforme necessário.
      entities: [UserEntity, ProductEntity, JewelryEntity],

      // Synchronize é utilizado para criar automaticamente as tabelas no banco de dados.
      synchronize: true,
    };
  },
};

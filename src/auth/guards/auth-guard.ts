import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


// CanActivate é um decorator  
// utilizado como contexto de guards, dizendo que a classe 
// é um guard que pode ser usado para proteger as rotas 
// ele fornece um contexto adicional sobre a classe AuthGuard no codig




@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
      // pega a req do contexto
      const req = context.switchToHttp().getRequest();
      // pegando o token do headers na req , lembrar que switch é um metodo fornecido pelo nest js nao esquercers
      const token = this.getTokenFromHeader(req);

      // se token não foi fornecido lançar uma exceção
      if (!token) {
          throw new UnauthorizedException("token doesn't exist.");
      }

      try {
          // verifica e  o token 
          const tokenContent = await this.jwtService.verifyAsync(token, {
              secret: this.configService.get('JWT_SECRET_KEY'),
          });

          // coloca as informacoes do usuario no objeto de requisição
          req['user'] = tokenContent;
      } catch (error) {
          // se der algum problema ao verificar o token, lançar uma exceção falando que o token não é valido
          throw new UnauthorizedException('Invalid token.');
      }

      // Retorna true para permitir que a rota seja acessada.
      return true;
  }

  // aqui extrai extrai o token da req
  private getTokenFromHeader(request: Request) {
      const headers = request.headers;

      // pega  o tipo e o token da header
      const [type, token] = headers?.authorization?.split(' ') || [];

      // retorna o token se o tipo for 'Bearer'.
      return type === 'Bearer' ? token : undefined;
  }
}

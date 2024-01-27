import { ExecutionContext, createParamDecorator } from '@nestjs/common';

// Função pra  auxiliar a obter o usuário pelo contexto
export const getUserByContext = (context: ExecutionContext) => {
  // Verifica se o tipo de contexto é HTTP
  if (context.getType() == 'http') {
    // pega a requisição e retorna o objeto usuario
    return context.switchToHttp().getRequest().user;
  }
};

// Decorator pra obter o usuario atual a partir do contexto
export const CurrentUser = createParamDecorator(
  // Os parâmetros não estão sendo usados, por isso (_)
  (_data: unknown, context: ExecutionContext) => getUserByContext(context),
);

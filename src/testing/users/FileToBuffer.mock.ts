// Importando as funcionalidades necessárias do módulo 'fs'
import { createReadStream, ReadStream } from 'fs';

// Função que recebe um nome de arquivo e retorna uma Promise com um objeto contendo buffer e stream
export const FileToBuffer = (filename: string) => {
  // Criando um stream de leitura do arquivo
  const readStream = createReadStream(filename);

  // Array para armazenar os pedaços (chunks) do arquivo
  const Chunks = [];

  // Retornando uma nova Promise com buffer e stream
  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      // Evento de 'data' é acionado quando novos dados são lidos do arquivo
      readStream.on('data', (chunk) => Chunks.push(chunk));

      // Evento de 'error' é acionado se houver algum erro durante a leitura
      readStream.on('error', (err) => reject(err));

      // Evento de 'close' é acionado quando a leitura do arquivo é concluída
      readStream.on('close', () => {
        // Resolvendo a Promise com o buffer consolidado e o stream de leitura
        resolve({
          buffer: Buffer.concat(Chunks) as Buffer,
          stream: readStream,
        });
      });
    },
  );
}

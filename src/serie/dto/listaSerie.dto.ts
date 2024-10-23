//classe DTO para retorno de listagem padronizada de usuários

import { FILME } from 'src/filmes/filme.entity';

//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
export class ListaSerieDTO {
  //dtos de resposta normalmente não tem nenhuma validação, apenas o constructor com os campos a serem retornados
  constructor(
    readonly id: string,
    readonly NOMESERIE: string,
    readonly TEMPORADA: number,
    readonly EPISODIO: number,
    readonly IDFILME: FILME,
  ) {}
}

export class ListagemSerieDTO {
  constructor(readonly serie: ListaSerieDTO[]) {}
}

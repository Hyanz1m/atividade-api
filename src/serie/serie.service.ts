import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { RetornoCadastroDTO, RetornoObjDTO } from 'src/dto/retorno.dto';
import { SERIE } from './serie.entity';
import { ListaSerieDTO } from './dto/listaSerie.dto';
import { criaSerieDTO } from './dto/serie.dto';
import { alteraSerieDTO } from './dto/alteraSerie.dto';
import { FilmeService } from 'src/filmes/filme.service';

@Injectable()
export class SerieService {
  constructor(
    @Inject('SERIE_REPOSITORY')
    private serieRepository: Repository<SERIE>,
    private filmeService: FilmeService,
  ) {}

  async listar(): Promise<ListaSerieDTO[]> {
    var seriesListadas = await this.serieRepository.find();
    return seriesListadas.map(
      (serie) =>
        new ListaSerieDTO(
          serie.ID,
          serie.NOMESERIE,
          serie.TEMPORADA,
          serie.EPISODIO,
          serie.IDFILME,
        ),
    );
  }

  async Compartilhar(id: string) {
    var serie = await this.serieRepository
      .createQueryBuilder('serie')
      .select('serie.ID', 'ID')
      .addSelect('serie.NOMESERIE', 'NOME_SERIE')
      .addSelect('serie.TEMPORADA', 'TEMPORADA')
      .addSelect('serie.EPISODIO', 'EPISODIO')
      .addSelect('serie.IDFILME', 'ID_FILME')
      .leftJoin('filme', 'fil', 'serie.IDFILME = fil.id')
      .andWhere('serie.ID = :ID', { ID: `${id}` })
      .getRawOne();

    return {
      message: `Estou assistindo a séroe ${serie.NOME_SERIE}. Episódio ${serie.EPISODIO} da temporada ${serie.TEMPORADA} Assista também!!`,
    };
  }

  async inserir(dados: criaSerieDTO): Promise<RetornoCadastroDTO> {
    let serie = new SERIE();
    serie.ID = uuid();
    serie.NOMESERIE = dados.NOMESERIE;
    serie.TEMPORADA = dados.TEMPORADA;
    serie.EPISODIO = dados.EPISODIO;
    serie.IDFILME = dados.IDFILME;

    return this.serieRepository
      .save(serie)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: serie.ID,
          message: 'Série cadastrada!',
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: '',
          message: 'Houve um erro ao cadastrar.' + error.message,
        };
      });
  }

  localizarID(ID: string): Promise<SERIE> {
    return this.serieRepository.findOne({
      where: {
        ID,
      },
    });
  }

  async remover(id: string): Promise<RetornoObjDTO> {
    const serie = await this.localizarID(id);

    return this.serieRepository
      .remove(serie)
      .then((result) => {
        return <RetornoObjDTO>{
          return: serie,
          message: 'Série excluida!',
        };
      })
      .catch((error) => {
        return <RetornoObjDTO>{
          return: serie,
          message: 'Houve um erro ao excluir.' + error.message,
        };
      });
  }

  async alterar(
    id: string,
    dados: alteraSerieDTO,
  ): Promise<RetornoCadastroDTO> {
    const serie = await this.localizarID(id);

    Object.entries(dados).forEach(async ([chave, valor]) => {
      if (chave === 'id') {
        return;
      }

      if (chave === 'IDFILME') {
        serie['IDFILME'] = await this.filmeService.localizarID(valor);
        return;
      }

      if (valor) serie[chave] = valor;
    });

    return this.serieRepository
      .save(serie)
      .then((result) => {
        return <RetornoCadastroDTO>{
          id: serie.ID,
          message: 'Série alterada!',
        };
      })
      .catch((error) => {
        return <RetornoCadastroDTO>{
          id: '',
          message: 'Houve um erro ao alterar.' + error.message,
        };
      });
  }
}

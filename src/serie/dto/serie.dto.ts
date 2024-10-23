import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FILME } from 'src/filmes/filme.entity';

export class criaSerieDTO {
  @IsString()
  @IsNotEmpty({ message: 'nome não pode ser vazio' })
  @ApiProperty({
    example: 'A volta dos que não foram',
    description: 'Nome da série, deve ser informado um texto contendo o nome',
  })
  NOMESERIE: string;

  @IsNumber()
  @ApiProperty({
    example: '3',
    description: 'Número da temporada, deve ser informado como number',
  })
  TEMPORADA: number;

  @IsString()
  @ApiProperty({
    example: '7',
    description: 'Número do episódio, deve ser informado como number',
  })
  EPISODIO: number;

  @IsString()
  @ApiProperty({
    example: 'f704e558-c4de-4074-a756-55f94c1bffdc',
    description: 'ID do filme no qual a série foi baseada',
  })
  IDFILME: FILME;
}

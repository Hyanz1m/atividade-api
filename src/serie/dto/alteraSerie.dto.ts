//classe responsável por definir padrão para alteração de usuários
//DTO é "data transfer object" ou objeto de transferencia de dados, ou seja, é um tipo de classe para transferir dados
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class alteraSerieDTO {
  //decorators de tipo e validação, são responsáveis por darem padrão e validar informações importantes nos DTOs
  //podem ser prédefinidos ou podem ser criados de forma customizada(exemplo email unico)
  @IsString()
  @IsNotEmpty({ message: 'nome não pode ser vazio' })
  @IsOptional()
  @ApiPropertyOptional({
    example: 'A volta dos que não foram',
    description: 'Nome da série, deve ser informado um texto contendo o nome',
  })
  NOMESERIE: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    example: '3',
    description: 'Número da temporada, deve ser informado como number',
  })
  DURACAO: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '7',
    description: 'Número do episódio, deve ser informado como number',
  })
  SINOPSE: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    example: '1990',
    description: 'Ano de lançamento do filme, deve ser informado como texto',
  })
  ANO: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'f704e558-c4de-4074-a756-55f94c1bffdc',
    description: 'ID do filme no qual a série foi baseada',
  })
  GENERO: string;
}

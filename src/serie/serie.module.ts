import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SerieController } from './serie.controller';
import { serieProviders } from './serie.providers';
import { SerieService } from './serie.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SerieController],
  providers: [...serieProviders, SerieService],
})
export class FilmeModule {}

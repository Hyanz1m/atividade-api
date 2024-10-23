//classe de modulo do aplicativo, responsável por administrar todos os modulos da aplicação

import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { FilmeModule } from './filmes/filme.module';
import { GeneroModule } from './genero/genero.module';



@Module({
  imports: [UsuarioModule,FilmeModule,GeneroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

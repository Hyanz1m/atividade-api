import { FILME } from 'src/filmes/filme.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class SERIE {
  @PrimaryColumn()
  ID: string;

  @Column()
  NOMESERIE: string;

  @Column()
  TEMPORADA: number;

  @Column()
  EPISODIO: number;

  @OneToOne(() => FILME, (filme) => filme.ID)
  @JoinColumn()
  IDFILME: FILME;
}

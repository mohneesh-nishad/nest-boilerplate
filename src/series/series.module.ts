import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesResolver } from './series.resolver';
import { seriesProviders } from './series.provider';
import { DatabaseModule } from 'src/core/database/db.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Series } from './entities';

@Module({
  // imports: [SequelizeModule.forFeature([Series])],
  providers: [SeriesResolver, SeriesService, ...seriesProviders],
  exports: [SeriesService]
})
export class SeriesModule { }

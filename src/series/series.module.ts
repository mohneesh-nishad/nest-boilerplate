import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesResolver } from './series.resolver';
import { seriesProviders } from './series.provider';

@Module({
  providers: [SeriesResolver, SeriesService, ...seriesProviders],
  exports: [SeriesService]
})
export class SeriesModule { }

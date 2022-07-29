import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/core/resolver/base.resolver';
import { SeriesCreateDto } from './dto/create-series.input';
import { Series } from './entities';
import { SeriesService } from './series.service';

@Resolver()
export class SeriesResolver extends BaseResolver(Series, SeriesCreateDto) {
  constructor(private readonly seriesService: SeriesService) {
    super(seriesService)
  }
}

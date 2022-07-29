import { Inject, Injectable } from '@nestjs/common';
import { SERIES_REPOSITORY } from 'src/core/constants';
import { SeriesCreateDto } from './dto/create-series.input';
import { Series } from './entities';

@Injectable()
export class SeriesService {
    constructor(@Inject(SERIES_REPOSITORY) private readonly repo: typeof Series) { }

    async create(input: SeriesCreateDto) {
        return this.repo.create({ ...input })
    }
}

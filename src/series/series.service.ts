import { Inject, Injectable } from '@nestjs/common';
import { SERIES_REPOSITORY } from 'src/core/constants';
import { BaseDataService } from 'src/core/resolver/service/base.service';
import { SeriesCreateDto } from './dto/create-series.input';
import { Series } from './entities';

@Injectable()
// export class SeriesService {

//     async create(input: SeriesCreateDto) {
//         return this.repo.create({ ...input })
//     }
// }


export class SeriesService extends BaseDataService(Series) {
    constructor(@Inject(SERIES_REPOSITORY) private readonly repo: typeof Series) {
        super()
    }

}
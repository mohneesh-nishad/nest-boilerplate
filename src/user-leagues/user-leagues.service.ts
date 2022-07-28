import { Inject, Injectable } from '@nestjs/common';
import { USER_LEAGUE_REPOSITORY } from 'src/core/constants';
import { LeagueCreateDto } from './dto/create-league.input';
import { UserLeague } from './entities';

@Injectable()
export class UserLeaguesService {
    constructor(@Inject(USER_LEAGUE_REPOSITORY) private readonly repo: typeof UserLeague) { }

    async findOne(id: number) {
        return this.repo.findOne({ where: { id } })
    }

    async createLeague(userId: number, leagueId: number = 1, seriesId: number = 1, rating: number = 0) {
        return this.repo.create({ userId, leagueId, seriesId, rating })
    }
}

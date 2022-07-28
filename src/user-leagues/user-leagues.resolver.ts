import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from 'src/core/resolver/base.resolver';
import { LeagueCreateDto } from './dto/create-league.input';
import { UserLeague } from './entities';
import { UserLeaguesService } from './user-leagues.service';

@Resolver((of) => 'UserLeague')
export class UserLeaguesResolver extends BaseResolver(UserLeague, LeagueCreateDto) {
  constructor(private readonly userLeaguesService: UserLeaguesService) {
    super()
  }
}

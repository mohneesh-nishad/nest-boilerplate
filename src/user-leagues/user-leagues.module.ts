import { Module } from '@nestjs/common';
import { UserLeaguesService } from './user-leagues.service';
import { UserLeaguesResolver } from './user-leagues.resolver';
import { userLeagueProviders } from './user-leagues.provider';

@Module({
  providers: [UserLeaguesResolver, UserLeaguesService, ...userLeagueProviders],
  exports: [UserLeaguesService]
})
export class UserLeaguesModule { }

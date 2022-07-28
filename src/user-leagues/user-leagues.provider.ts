import { USER_LEAGUE_REPOSITORY } from "src/core/constants";
import { UserLeague } from "./entities";

export const userLeagueProviders = [{
    provide: USER_LEAGUE_REPOSITORY,
    useValue: UserLeague
}]
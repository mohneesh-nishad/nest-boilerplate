import { SERIES_REPOSITORY } from "src/core/constants";
import { Series } from "./entities";

export const seriesProviders = [{
    provide: SERIES_REPOSITORY,
    useValue: Series
}]
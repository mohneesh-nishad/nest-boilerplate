import { Type } from "@nestjs/common";
import { Query, Args, Int, Resolver, ObjectType, Mutation } from "@nestjs/graphql";
import { capitalize } from "lodash";
import { PaginationConnection } from "sequelize-cursor-pagination";
import Paginated from "src/common/pagination/pagination";
import { PaginationArgs } from "src/common/pagination/pagination.args";
import { PostOrder } from "src/posts/dto/post-order.input";
import { IBaseDataService } from "./service/base.service";


type Constructor<I> = new (...args: any[]) => I;

export interface IPageArgs {
    after: string
    before: string
    limit: number
    query: string
    orderBy: PostOrder
}

export interface IBaseResolver<T, C> {
    readonly BaseService: IBaseDataService<T, C>;

    findOne: (id: number) => Promise<T | null>;

    cursorPagination: (after: string, before: string, limit: number, query: string, orderBy: PostOrder) => Promise<PaginationConnection<T> | null>
}


export function BaseResolver<T, C>(entityType: Constructor<T>, createInputType: C): Type<IBaseResolver<T, C>> {

    @ObjectType(`${capitalize(entityType.name)}CursorConnection`)
    class BaseCursorConnection extends Paginated(entityType) { }

    @Resolver({ isAbstract: true })
    class BaseResolver implements IBaseResolver<T, C> {
        constructor(readonly BaseService: IBaseDataService<T, C>) { }

        @Query(() => entityType, { name: `get${capitalize(entityType.name)}ById`, nullable: true, })
        findOne(@Args('id', { type: () => Int }) id: number) {
            return this.BaseService.findOne(id);
        }

        @Query(() => BaseCursorConnection, { name: `getCursorBased${entityType.name}Search`, nullable: true })
        cursorPagination(
            @Args({ name: 'after', type: () => String, nullable: true })
            after: string,
            @Args({ name: 'before', type: () => String, nullable: true })
            before: string,
            @Args({ name: 'limit', type: () => Int, nullable: false })
            limit: number,
            @Args({ name: 'query', type: () => String, nullable: true })
            query: string,
            @Args({
                name: 'orderBy',
                type: () => PostOrder,
                nullable: true,
            })
            orderBy: PostOrder) {
            return this.BaseService.getPaginatedResult(query, limit, after, before, orderBy)

        }

        @Mutation(() => entityType, { name: `create${capitalize(entityType.name)}` })
        create(@Args({ type: () => createInputType, name: `create${capitalize(entityType.name)}Input` }) input: C) {
            return this.BaseService.create(input)
        }

    }

    return BaseResolver
}
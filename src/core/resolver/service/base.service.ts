import { Inject, Type } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Model } from "sequelize-typescript";
import { IPaginatedType } from "src/common/pagination/pagination";
import { PostOrder } from "src/posts/dto/post-order.input";


type Constructor<I> = new (...args: any[]) => I;  //Main Point


export interface IBaseDataService<T, C> {

    findOne: (id: number) => Promise<T>

    getPaginatedResult?: (query: string, limit: number, after: string, before: string, orderBy: PostOrder) => Promise<IPaginatedType<T>>

    create: (input: C) => Promise<T | null>
}


export function BaseDataService<T, C>(entity: Constructor<T>): Type<IBaseDataService<T, C>> {
    const REPO = `${entity.name?.toUpperCase()}_REPOSITORY`;
    class DataService implements IBaseDataService<T, C>{
        constructor(@InjectModel(entity) private readonly repo: typeof entity) { }


        async findOne(id: number) {
            // @ts-ignore
            return await this.repo.findOne({ where: { id } });
        }


        async create(input: C) {
            // @ts-ignore
            return await this.repo.create({ ...input })
        }

    }


    return DataService
}
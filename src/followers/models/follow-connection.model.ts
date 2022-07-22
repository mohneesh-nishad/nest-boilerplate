import { Field, Int, ObjectType } from "@nestjs/graphql";
import Paginator from "src/common/pagination/nwpagination";
import { Followers } from "../entities";
import { IFollowers } from "./followers.model";

@ObjectType()
export class FollowConnection extends Paginator(Followers) { }
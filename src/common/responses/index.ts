import { ObjectType } from "@nestjs/graphql";
import { UserProfile } from "src/user-profile/entities";
import { User } from "src/users/entities";
import Paginator from "../pagination/nwpagination";
import { SingleResponse } from "./single.response";


/** Single Entity Response */
@ObjectType()
export class ProfileResponse extends SingleResponse(UserProfile) { }
@ObjectType()
export class UserResponse extends SingleResponse(User) { }



/** Multiple Entity Responses */
@ObjectType()
export class UserConnection extends Paginator(User) { }

import { Injectable } from '@nestjs/common';
import {IPost} from "./interfaces/post.interface";

@Injectable()
export class PostsService {
    posts: Array<IPost>;

    constructor() {
        this.posts = [];
    }

    addPost(post: IPost): IPost {
        this.posts.push(post);
        return this.posts[this.posts.length - 1];
    }

    getList(): Array<IPost> {
        return this.posts;
    }
}

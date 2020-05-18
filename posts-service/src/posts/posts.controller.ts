import { Controller } from '@nestjs/common';
import {PostsService} from "./posts.service";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {IKafkaMessage} from "../interfaces/kafka-message.interface";
import {IPost} from "./interfaces/post.interface";

@Controller()
export class PostsController {
    constructor(private postsService: PostsService) {}

    @MessagePattern('get.posts.list')
    getPosts() {
        return this.postsService.getList();
    }

    @MessagePattern('add.new.post')
    addPost(@Payload() message: IKafkaMessage<IPost>) {
        return this.postsService.addPost(message.value);
    }
}

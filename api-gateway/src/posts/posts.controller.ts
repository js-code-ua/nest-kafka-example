import {Body, Controller, Get, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {IPost} from "./interfaces/post.interface";

@Controller('posts')
export class PostsController {
    @Client({
        transport: Transport.KAFKA,
        options: {
            client: {
                clientId: 'posts',
                brokers: ['localhost:9092'],
            },
            consumer: {
                groupId: 'posts-consumer'
            }
        }
    })
    client: ClientKafka;

    async onModuleInit() {
        this.client.subscribeToResponseOf('add.new.post');
        this.client.subscribeToResponseOf('get.posts.list');

        await this.client.connect();
    }

    @Post('/')
    appPost(@Body() post: IPost) {
        console.log(post)
        return this.client.send('add.new.post', post);
    }

    @Get('/')
    getList() {
        return this.client.send('get.posts.list', '');
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Token } from 'src/entities/token.entity';
import { nanoid } from 'nanoid'

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token)
        private readonly tokenRepository: MongoRepository<Token>,
    ) {}

    async generate(expireAfterSeconds: number) {
        const nanoUuid = nanoid();
        await this.tokenRepository.createCollectionIndex('createdAt', { expireAfterSeconds: expireAfterSeconds });
        await this.tokenRepository.save({ token: nanoUuid });
        return nanoUuid;
    }

    verify(token: string) {}
}

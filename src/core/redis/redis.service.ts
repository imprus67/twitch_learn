import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
	public constructor(readonly configService: ConfigService) {
		super(configService.getOrThrow<string>('REDIS_URI'));
	}
}

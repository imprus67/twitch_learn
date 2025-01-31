import { isDev } from '../../shared/utils/is-dev.util';
import type { MailerOptions } from '@nestjs-modules/mailer';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export function getMailerConfig(configService: ConfigService): MailerOptions {
	return {
		transport: {
			host: configService.getOrThrow<string>('MAIL_HOST'),
			port: configService.getOrThrow<number>('MAIL_PORT'),
			secure: false,
			auth: {
				user: configService.getOrThrow<string>('MAIL_LOGIN'),
				pass: configService.getOrThrow<string>('MAIL_PASSWORD'),
			},
		},
		defaults: {
			from: `"Teastream" ${configService.getOrThrow<string>('MAIL_LOGIN')}`,
		},
	};
}

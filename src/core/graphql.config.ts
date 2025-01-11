import { isDev } from '../shared/utils/is-dev.util';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

export function getGraphQLConfig(
	configService: ConfigService
): ApolloDriverConfig {
	return {
		playground: isDev(configService),
		path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
		autoSchemaFile: join(process.cwd(), 'src/core/graphql/shema.gql'),
		sortSchema: true,
		context: ({ req, res }) => ({ req, res }),
	};
}

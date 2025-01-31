import type {
	DeviceInfo,
	LocationInfo,
	SessionMetadataInfo,
} from '@/src/shared/types/session-metadata.types';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocationModel implements LocationInfo {
	@Field(() => String)
	country: string;

	@Field(() => String)
	city: string;

	@Field(() => String)
	latitude: number;

	@Field(() => String)
	longitude: number;
}

@ObjectType()
export class DeviceModel implements DeviceInfo {
	@Field(() => String)
	browser: string;

	@Field(() => String)
	os: string;

	@Field(() => String)
	type: string;
}

@ObjectType()
export class SessionMetadataModel implements SessionMetadataInfo {
	@Field(() => LocationModel)
	public location: LocationModel;

	@Field(() => DeviceModel)
	public device: DeviceModel;

	@Field(() => String)
	public ip: string;
}

@ObjectType()
export class SessionModel {
	@Field(() => ID)
	id: string;

	@Field(() => String)
	userId: string;

	@Field(() => String)
	createdAt: String;

	@Field(() => SessionMetadataModel)
	metadata: SessionMetadataModel;
}

import { CreateUserInput } from './inputs/create-user.input';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';

@Injectable()
export class AccountService {
	public constructor(private readonly prismaService: PrismaService) { }

	/* public async findAll() {
		const users = await this.prismaService.user.findMany();

		return users;
	}
*/

	public async me(id: string) {
		const user = await this.prismaService.user.findUnique({
			where: {
				id
			}
		})
		return user;
	}

	public async create(input: CreateUserInput) {
		const { username, email, password } = input;

		const isUsernameExist = await this.prismaService.user.findUnique({
			where: {
				username,
			},
		});

		if (isUsernameExist) {
			throw new ConflictException('Это имя пользователя уже занято');
		}

		const isEmailExist = await this.prismaService.user.findUnique({
			where: {
				username,
			},
		});

		if (isEmailExist) {
			throw new ConflictException('Эта почта уже занята');
		}

		await this.prismaService.user.create({
			data: {
				username,
				email,
				password: await hash(password),
				displayName: username,
			},
		});

		// return user;
		return true;
	}
}

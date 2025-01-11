import { AccountService } from './account.service';
import { UserModel } from './models/user.model';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Account')
export class AccountResolver {
	public constructor(private readonly accountService: AccountService) {}

	@Query(() => [UserModel], { name: 'fundAllUsers' })
	public async findAll() {
		return this.accountService.findAll();
	}
}

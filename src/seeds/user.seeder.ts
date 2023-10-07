import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { User } from 'users/entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(User);

    const data = {
      name: 'Eduardo Garcia',
      email: 'eduardo-266@hotmail.com',
      password: '123',
    };

    const user = await repository.findOneBy({ email: data.email });

    if (!user) {
      const userCreate = await repository.create(data);
      await repository.save(userCreate);
    }
  }
}

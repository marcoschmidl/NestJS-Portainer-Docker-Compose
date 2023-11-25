import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user';

@Module({

  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },

    ]),
  ],
  providers: [
    UsersService,
  ],

  controllers: [
    UsersController,
  ],

  exports:
    [UsersService,
    ],

})
export class UsersModule {
}

export default UsersModule;

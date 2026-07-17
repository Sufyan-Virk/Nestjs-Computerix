import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthMiddleware } from '../common/middleware/auth.middleware';
import { User, UserSchema } from './schemas/user.schema';
import { Product, ProductSchema } from '../product/product.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Product.name, schema: ProductSchema }]),
    ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(UserController);
  }
}


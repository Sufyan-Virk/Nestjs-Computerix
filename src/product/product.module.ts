import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService, TenantProductsService } from './product.service';
import { Product, ProductSchema } from './product.schema';
import { TenantsMiddleware } from 'src/common/middleware/tenant.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService, TenantProductsService],
  exports: [ProductService, TenantProductsService], // Export if needed in other modules
})
export class ProductModule implements NestModule {
   configure(consumer: MiddlewareConsumer) {
     consumer.apply(TenantsMiddleware).forRoutes(ProductController)
   }
}
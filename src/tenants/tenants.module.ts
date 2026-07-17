import { Module } from '@nestjs/common';
import { TenantsService } from './tenant.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Tenant, TenantSchema } from './tenant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tenant.name,
        schema: TenantSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
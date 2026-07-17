import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Tenant extends Document {
  @Prop({ required: true })
  companyName: string;

  @Prop({ required: true, unique: true })
  tenantId: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);
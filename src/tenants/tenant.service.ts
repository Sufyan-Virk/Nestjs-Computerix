import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tenant } from './tenant.schema';
import { Model } from 'mongoose';
import { CreateTenantDto, UpdateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(Tenant.name)
    private TenantModel: Model<Tenant>,
  ) {}

  // Fetch a tenant by their custom tenantId string (as shown in your screenshot)
  async getTenantById(tenantId: string) {
    const tenant = await this.TenantModel.findOne({ tenantId });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID "${tenantId}" not found`);
    }
    return tenant;
  }

  // Create a new tenant (checks for duplicates first)
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const existingTenant = await this.TenantModel.findOne({ tenantId: createTenantDto.tenantId }).exec();
    if (existingTenant) {
      throw new ConflictException(`Tenant with ID "${createTenantDto.tenantId}" already exists`);
    }

    const newTenant = new this.TenantModel(createTenantDto);
    return await newTenant.save();
  }

  // Find all tenants
  async findAll(): Promise<Tenant[]> {
    return await this.TenantModel.find().exec();
  }

  // Find a tenant by their MongoDB _id
  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.TenantModel.findById(id).exec();
    if (!tenant) {
      throw new NotFoundException(`Tenant with database ID ${id} not found`);
    }
    return tenant;
  }

  // Update a tenant by their MongoDB _id
  async update(id: string, updateTenantDto: UpdateTenantDto): Promise<Tenant> {
    const updatedTenant = await this.TenantModel
      .findByIdAndUpdate(id, updateTenantDto, { new: true })
      .exec();
    if (!updatedTenant) {
      throw new NotFoundException(`Tenant with database ID ${id} not found`);
    }
    return updatedTenant;
  }

  // Delete a tenant by their MongoDB _id
  async remove(id: string): Promise<{ message: string }> {
    const deletedTenant = await this.TenantModel.findByIdAndDelete(id).exec();
    if (!deletedTenant) {
      throw new NotFoundException(`Tenant with database ID ${id} not found`);
    }
    return { message: 'Tenant successfully deleted' };
  }
}
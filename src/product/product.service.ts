import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductSchema } from './product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Connection } from 'mongoose';
@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: 'Product successfully deleted' };
  }
}

@Injectable() 
export class TenantProductsService {
  constructor(@InjectConnection() private connection: Connection) {}

async getTenantConnection(tenantId: string) {
  return this.connection.useDb(`tenant_${tenantId}`);
}

async getTenantProducts(tenantId: string) {
  const tenantConnection = await this.getTenantConnection(tenantId);
  const productModel = await tenantConnection.model(
    Product.name,
    ProductSchema,
  );
  return productModel.find();
}
}
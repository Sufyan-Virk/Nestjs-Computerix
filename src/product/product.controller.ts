import { Controller, Get, Post, Body, Param, Patch, Delete, Req, Inject } from '@nestjs/common';
import { ProductService, TenantProductsService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { Connection } from 'mongoose';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService,
    private readonly TenantProductsService: TenantProductsService,
   
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  // @Get()
  // async findAll() {
  //   return await this.productService.findAll();
  // }

  @Get()
  async getTenantProducts(@Req() {tenantId}) {
    // 23
    return this.tennantConnection.db?.databaseName
    return await this.TenantProductsService.getTenantProducts(tenantId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productService.remove(id);
  }
}
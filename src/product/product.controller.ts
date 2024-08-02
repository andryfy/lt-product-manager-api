import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@app/auth/auth.guard';
import { IResponse } from '@app/interfaces/response.interface';
import { Product } from './entities/product.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<IResponse> {
    try {
      const data: Product = await this.productService.create(createProductDto);
      return {
        success: true,
        message: 'Product Created Successfully',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findMany(@Query('keyword') search?: string): Promise<IResponse> {
    try {
      const data: Product[] = await this.productService.findMany({
        keyword: search,
      });
      return {
        success: true,
        data: data,
        message: 'Product Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse> {
    try {
      const data: Product = await this.productService.findOne(+id);
      return {
        success: true,
        data: data,
        message: 'Product Fetched Successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<IResponse> {
    try {
      const data: Product = await this.productService.update(
        +id,
        updateProductDto,
      );
      return {
        success: true,
        message: 'Product Updated Successfully',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IResponse> {
    try {
      const data: Product = await this.productService.remove(+id);
      return {
        success: true,
        message: 'Product Deleted Successfully',
        data: data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }
  }
}

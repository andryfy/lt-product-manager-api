import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly userRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const userData = await this.userRepository.create(createProductDto);
    return this.userRepository.save(userData);
  }

  async findAll(): Promise<Product[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }
    return userData;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const existingProduct = await this.findOne(id);
    const userData = this.userRepository.merge(
      existingProduct,
      updateProductDto,
    );
    return await this.userRepository.save(userData);
  }

  async remove(id: number): Promise<Product> {
    const existingProduct = await this.findOne(id);
    return await this.userRepository.remove(existingProduct);
  }
}

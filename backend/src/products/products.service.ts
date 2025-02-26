import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {

  constructor(private prismaServicio:PrismaService){}

  // Funcion para CREAR
  create(createProductDto: CreateProductDto) {
    return this.prismaServicio.products.create({
      data : createProductDto
    });
  }

  // Funcion para Mostrar todos los datos.
  findAll() {
    // SELECT * FROM products;
    return this.prismaServicio.products.findMany();
  }

  async findOne(iD: number) {

    const productFound = await this.prismaServicio.products.findUnique({
      where :{
        id : iD
      }
    })

    if(!productFound){
      throw new NotFoundException(`Product with iDD ${iD} not found...`);
    }

    return productFound;
  
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}

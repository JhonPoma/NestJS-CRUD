import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import {Prisma} from '@prisma/client'

@Injectable()
export class ProductsService {

  constructor(private prismaServicio:PrismaService){}

// Funcion para CREAR
  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaServicio.products.create({
        data : createProductDto
      });
    } catch (error) {
      if(error instanceof Prisma.PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
          throw new ConflictException(
            `Product with name ${createProductDto.name} already exists`
          );
        }
      }
    }
  }

// Funcion para Mostrar todos los datos.
  findAll() {
    // SELECT * FROM products;
    return this.prismaServicio.products.findMany();
  }

// Function async for view only one data
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

// Function o method async for update
  async update(iD: number, updateProductDto: UpdateProductDto) {

    const productToUpdate = await this.prismaServicio.products.findUnique({
        where : {
          id : iD
        }
    })
    // If the product to be deleted is not found.
    if(!productToUpdate) throw new NotFoundException(`Product with Idd ${iD} not found .. .`);
    
    const updateProduct = await this.prismaServicio.products.update({
      where : {
        id : iD
      },
      data : updateProductDto
    })

    return updateProduct;
  }


// Function o method async for delete
  async remove(iD: number) {
    const productToDelete = await this.prismaServicio.products.findUnique({
        where : {
          id : iD
        }
    })
    // If the product to be deleted is not found.
    if(!productToDelete) throw new NotFoundException(`Product with Idd ${iD} not found .. .`);
    
    // If the product exists
    const deleteProduct = await this.prismaServicio.products.delete({
      where : {
        id : iD
      }
    })

    return "eliminado";
  }
}

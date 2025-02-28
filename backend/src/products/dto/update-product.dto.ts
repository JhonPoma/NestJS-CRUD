/*
    Esto usariamos si nuestro CreateProductDto es una clase, pero nosotros lo
    definimos como un tipo TYPE.

import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {}

*/


import {CreateProductDto} from './create-product.dto'

type UpdateProductDto = Partial<CreateProductDto>

export {
    UpdateProductDto
}
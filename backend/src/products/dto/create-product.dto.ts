//export class CreateProductDto {}

import {Products} from '@prisma/client'

// Cremos un tipo de dato donde no queremos ID, createAt, updateAt
type CreateProductDto = Omit<Products, 'id' | 'createdAt' | 'updateAt'>

export {
    CreateProductDto
}
//export class CreateProductDto {}

import {products} from '@prisma/client'

// Cremos un tipo de dato donde no queremos ID, createAt, updateAt
type CreateProductDto = Omit<products, 'id' | 'createdAt' | 'updateAt'>

export {
    CreateProductDto
}
import { productRepo } from 'src/db/repositories/product.repo'
import type { ProductListConfig } from 'src/types/product.type'

const productApi = {
  getProducts(params: ProductListConfig) {
    return productRepo.list(params)
  },
  getProductDetail(id: string) {
    return productRepo.getById(id)
  }
}

export default productApi

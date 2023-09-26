import http from 'src/utils/http'
import { Product, ProductList, ProductListConfig } from 'src/types/product.type'
import { SuccessResponseApi } from 'src/types/utils.type'

const URL = 'products'
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponseApi<ProductList>>(URL, {
      params
    })
  },
  getProductDetails(id: string) {
    return http.get<SuccessResponseApi<Product>>(`${URL}/${id}`)
  }
}

export default productApi

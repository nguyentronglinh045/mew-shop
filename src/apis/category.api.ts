import { categoryRepo } from 'src/db/repositories/category.repo'

const categoryAPI = {
  getCategory() {
    return categoryRepo.list()
  }
}

export default categoryAPI

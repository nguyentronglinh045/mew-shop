import { purchaseRepo } from 'src/db/repositories/purchase.repo'
import type { PurchaseListStatus } from 'src/types/purchase.type'
import { getProfileFromLS } from 'src/utils/auth'

const currentUserId = (): string | null => {
  const profile = getProfileFromLS() as { _id?: string } | null
  return profile?._id ?? null
}

const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return purchaseRepo.addToCart(currentUserId(), body)
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return purchaseRepo.getPurchases(currentUserId(), params)
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return purchaseRepo.buyProducts(currentUserId(), body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return purchaseRepo.updatePurchase(currentUserId(), body)
  },
  deletePurchase(purchaseIds: string[]) {
    return purchaseRepo.deletePurchase(currentUserId(), purchaseIds)
  }
}

export default purchaseApi

import { useMutation, useQuery } from '@tanstack/react-query'
import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/apis/purchase.api'
import Button from 'src/components/Button'
import QuantityController from 'src/components/QuantityController'
import path from 'src/constants/path'
import { purchasesStatus } from 'src/constants/purchase'
import { Purchase } from 'src/types/purchase.type'
import { formatCurrency, generateNameId } from 'src/utils/utils'
import NoProductInCart from '../../assets/images/ProductNotFound.png'
import { toast } from 'react-toastify'

interface extendedPurchases extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<extendedPurchases[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  const checkedPurchases = extendedPurchases.filter((purchase) => purchase.checked)
  const checkedPurchasesCount = checkedPurchases.length
  const totalCheckedPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count
      }, 0),
    [checkedPurchases]
  )
  const totalCheckedPurchaseSavingPrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + (current.product.price_before_discount - current.product.price) * current.buy_count
      }, 0),
    [checkedPurchases]
  )

  const updatePurchaseMutation = useMutation({
    mutationFn: purchaseApi.updatePurchase,
    onSuccess: () => {
      refetch()
    }
  })

  const buyPurchaseMutation = useMutation({
    mutationFn: purchaseApi.buyProducts,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, { autoClose: 2000 })
    }
  })
  const deletePurchaseMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, { autoClose: 2000 })
    }
  })

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      console.log(extendedPurchasesObject)

      return (
        purchasesInCart?.map((purchase) => ({
          ...purchase,
          disabled: false,
          checked: Boolean(extendedPurchasesObject[purchase._id]?.checked)
        })) || []
      )
    })
  }, [purchasesInCart])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draf) => {
        draf[purchaseIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleQuantity = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draf) => {
          draf[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }
  const handleTypeQuantity = (purchaseIndex: number) => (value: number) => {
    setExtendedPurchases(
      produce((draf) => {
        draf[purchaseIndex].buy_count = value
      })
    )
  }

  // const handleDelete = (purchaseIndex: number) => () => {
  //   const purchaseId = extendedPurchases[purchaseIndex]._id
  //   deletePurchaseMutation.mutate([purchaseId])
  // }
  const handleDeleteManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id)
    deletePurchaseMutation.mutate(purchaseIds)
  }

  const handleBuyProducts = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyPurchaseMutation.mutate(body)
    }
  }

  return (
    <div className='bg-[#f3f3f3] py-2 md:py-6'>
      <Helmet>
        <title>Giỏ hàng</title>
        <meta name='description' content='Giỏ hàng của tôi ' />
      </Helmet>
      <div className='container p-2 shadow md:p-4 '>
        <div className='mb-2 text-lg font-bold md:text-2xl'>
          <h2>Giỏ hàng</h2>
        </div>
        {extendedPurchases && extendedPurchases.length > 0 ? (
          <>
            <div className='flex flex-col gap-2'>
              {extendedPurchases.map((purchase, index) => (
                <div
                  className='flex items-center gap-4 border-b bg-white p-4 max-sm:items-start md:p-5'
                  key={purchase.product._id}
                >
                  <div className=''>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-main-color'
                      checked={purchase.checked}
                      onChange={handleChecked(index)}
                    />
                  </div>
                  <div className='flex max-w-full items-center gap-2 truncate max-sm:items-start'>
                    <Link
                      to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                      className='shrink-0 border border-gray-200'
                    >
                      <img
                        src={purchase.product.image}
                        alt={purchase.product.name}
                        className='h-20 w-20 md:h-24 md:w-24'
                      />
                    </Link>
                    <div className='flex flex-col truncate max-sm:items-start'>
                      <Link
                        to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                        className='truncate text-base font-medium uppercase text-black md:text-base'
                      >
                        {purchase.product.name}
                      </Link>
                      <div className='flex items-center gap-x-4 gap-y-2 max-sm:flex-col max-sm:items-start'>
                        <div className='flex gap-1 md:gap-2'>
                          <span className='text-base text-gray-500 line-through md:text-base'>
                            ₫{formatCurrency(purchase.price_before_discount)}
                          </span>
                          <span className='text-base font-bold text-main-color md:text-base'>
                            ₫{formatCurrency(purchase.price)}
                          </span>
                        </div>
                        <QuantityController
                          classNameWrapper='h-8'
                          value={purchase.buy_count}
                          max={purchase.product.quantity}
                          onIncrease={(value) => handleQuantity(index, value, value <= purchase.product.quantity)}
                          onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                          onType={handleTypeQuantity(index)}
                          onFocusOut={(value) =>
                            handleQuantity(
                              index,
                              value,
                              value >= 1 &&
                                value <= purchase.product.quantity &&
                                value !== (purchasesInCart as Purchase[])[index].buy_count
                            )
                          }
                          disabled={purchase.disabled}
                        />
                        <div className='flex gap-1'>{purchase.product.quantity} kha dung</div>
                        <div className='text-base font-bold text-main-color md:text-base'>
                          <span>₫{formatCurrency(purchase.price * purchase.buy_count)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className='sticky bottom-0 z-10 mt-8 flex flex-col gap-1 rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:justify-between'>
                <div className='flex flex-wrap items-center justify-between'>
                  <div className='flex flex-shrink-0 items-center justify-center'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-main-color'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                    <button className='mx-3 border-none bg-none' onClick={handleCheckAll}>
                      Chọn tất cả {extendedPurchases.length}
                    </button>
                  </div>
                  <button className='mx-3 border-none bg-none text-main-color' onClick={handleDeleteManyPurchases}>
                    Xóa
                  </button>
                </div>

                <div className='mt-2 flex flex-col sm:mt-0 sm:flex-row sm:items-center'>
                  <div>
                    <div className='flex items-center max-sm:flex-col max-sm:items-start'>
                      <div>Tổng thanh toán ({checkedPurchasesCount} sản phẩm):</div>
                      <div className='ml-2 text-2xl text-main-color max-sm:ml-0 md:text-xl lg:text-2xl'>
                        ₫{formatCurrency(totalCheckedPurchasePrice)}
                      </div>
                    </div>
                    <div className='flex items-center text-sm sm:justify-end'>
                      <div className='text-gray-500'>Tiết kiệm:</div>
                      <div className='ml-2 text-main-color'>₫{formatCurrency(totalCheckedPurchaseSavingPrice)}</div>
                    </div>
                  </div>
                  <Button
                    className='mx-auto mt-2 flex h-10 w-full items-center justify-center rounded-md bg-main-color text-sm font-bold uppercase text-white hover:bg-main-color/80 sm:ml-4 sm:mt-0 sm:w-32 lg:w-48'
                    classNameText='font-semibold'
                    onClick={handleBuyProducts}
                    disabled={buyPurchaseMutation.isLoading}
                  >
                    Mua hàng
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-col justify-center gap-2'>
            <img className='mx-auto h-1/2 w-1/2' src={NoProductInCart} alt='no-purchase' />
            <span className='text-center text-lg font-bold text-gray-500'>Giỏ hàng trống</span>
            <Link
              to={path.home}
              className='w-fit self-center rounded-md bg-main-color px-10 py-3 font-bold uppercase text-white transition-all hover:bg-main-color/80'
            >
              Mua Ngay
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

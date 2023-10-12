import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Authentication.requiredConfirmPassword')
    .min(6, 'Authentication.lengthRequired')
    .max(160, 'Authentication.lengthRequired')
    .oneOf([yup.ref(refString)], 'Authentication.passwordMismatch')
}
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_max, price_min } = this.parent as { price_min: string; price_max: string }
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min !== '' || price_max !== ''
}
export const schema = yup.object({
  email: yup
    .string()
    .required('Authentication.requiredEmail')
    .email('Authentication.emailInvalidate')
    .min(5, 'Authentication.lengthRequired')
    .max(160, 'Authentication.lengthRequired'),
  password: yup
    .string()
    .required('Authentication.requiredPassword')
    .min(6, 'Authentication.lengthRequired')
    .max(160, 'Authentication.lengthRequired'),
  confirm_password: handleConfirmPasswordYup('password'),
  price_min: yup.string().test({
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  price_max: yup.string().test({
    name: 'price_not_allowed',
    message: 'Giá không phù hợp',
    test: testPriceMinMax
  }),
  name: yup.string().trim().required('Tên sản phẩm là bắt buộc')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Authentication.lengthRequired'),
  phone: yup.string().max(20, 'User.lengthPhoneRequired'),
  address: yup.string().max(160, 'Authentication.lengthRequired'),
  avatar: yup.string().max(1000, 'User.maxLengthAvtName'),
  date_of_birth: yup.date().max(new Date(), 'User.dateInPast'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export const contactSchema = yup.object({
  name: yup.string().max(160, 'Authentication.lengthRequired').required('Tên không được để trống'),
  email: yup
    .string()
    .required('Authentication.requiredEmail')
    .email('Authentication.emailInvalidate')
    .min(5, 'Authentication.lengthRequired')
    .max(160, 'Authentication.lengthRequired'),
  message: yup.string().trim().min(20, 'Không dưới 20 kí tự').required('Không được để trống')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>
export type ContactSchema = yup.InferType<typeof contactSchema>

import * as yup from 'yup'

const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required('Authentication.requiredConfirmPassword')
    .min(6, 'Authentication.lengthRequired')
    .max(160, 'Authentication.lengthRequired')
    .oneOf([yup.ref(refString)], 'Authentication.passwordMismatch')
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
  confirm_password: handleConfirmPasswordYup('password')
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  phone: yup.string().max(20, 'Độ dài tối đa là 20 kí tự'),
  address: yup.string().max(160, 'Độ dài tối đa là 160 kí tự'),
  avatar: yup.string().max(1000, 'Độ dài tối đa là 1000 kí tự'),
  date_of_birth: yup.date().max(new Date(), 'Hãy chọn một ngày trong quá khứ'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>

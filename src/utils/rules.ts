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
  name: yup.string().max(160, 'Authentication.lengthRequired'),
  phone: yup.string().max(20, 'User.lengthPhoneRequired'),
  address: yup.string().max(160, 'Authentication.lengthRequired'),
  avatar: yup.string().max(1000, 'User.maxLengthAvtName'),
  date_of_birth: yup.date().max(new Date(), 'User.dateInPast'),
  password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  new_password: schema.fields['password'] as yup.StringSchema<string | undefined, yup.AnyObject, undefined, ''>,
  confirm_password: handleConfirmPasswordYup('new_password')
})

export type UserSchema = yup.InferType<typeof userSchema>
export type Schema = yup.InferType<typeof schema>

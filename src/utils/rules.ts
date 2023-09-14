import * as yup from 'yup'

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
  confirm_password: yup
    .string()
    .required('Authentication.requiredConfirmPassword')
    .min(6, 'Authentication.lengthRequired')
    .max(160, 'Authentication.lengthRequired')
    .oneOf([yup.ref('password')], 'Authentication.passwordMismatch')
})

export type Schema = yup.InferType<typeof schema>

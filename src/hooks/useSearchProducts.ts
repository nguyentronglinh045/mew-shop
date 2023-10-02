import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'
import useQueryConfig from './useQueryConfig'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const config = {
      ...queryConfig,
      name: data.name
    }
    if (Number(queryConfig.page) > 1) {
      config.page = '1'
    }
    console.log(config)

    navigate({
      pathname: path.productList,
      search: createSearchParams(config).toString()
      // search: createSearchParams({
      //   ...queryConfig,
      //   name: data.name
      // }).toString()
    })
  })
  return { register, onSubmitSearch }
}

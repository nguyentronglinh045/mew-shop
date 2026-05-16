import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })

  const onSubmitSearch = handleSubmit((data) => {
    const keyword = data.name?.trim()
    if (!keyword) return
    navigate({
      pathname: path.search,
      search: createSearchParams({ q: keyword }).toString()
    })
  })
  return { register, onSubmitSearch }
}

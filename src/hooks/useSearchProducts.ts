import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from 'src/constants/path'
import { Schema, schema } from 'src/utils/rules'
import useQueryParams from './useQueryParams'
import { useEffect } from 'react'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])
const MAX_SEARCH_LENGTH = 160

export default function useSearchProducts() {
  const navigate = useNavigate()
  const queryParams = useQueryParams()
  const q = (queryParams.q as string) || ''

  const { register, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      name: q
    },
    resolver: yupResolver(nameSchema)
  })

  useEffect(() => {
    setValue('name', q)
  }, [q, setValue])

  const onSubmitSearch = handleSubmit((data) => {
    const keyword = data.name?.trim()
    if (!keyword || keyword.length > MAX_SEARCH_LENGTH) return
    navigate({
      pathname: path.search,
      search: createSearchParams({ q: keyword }).toString()
    })
  })
  return { register, onSubmitSearch }
}

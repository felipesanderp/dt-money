import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'

import { SearchFormContainer } from "./styles";

const searchFormSchema = zod.object({
  query: zod.string(),
})

export function SearchForm() {
  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<zod.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: zod.infer<typeof searchFormSchema>) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log(data)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input 
        type="text" 
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type='submit' disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}
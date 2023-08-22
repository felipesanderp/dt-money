import { useContext } from 'react';
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'

import { SearchFormContainer } from "./styles";

import { TransactionsContext } from '../../../../contexts/TransactionsContext';

const searchFormSchema = zod.object({
  query: zod.string(),
})

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext)

  const { 
    register, 
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<zod.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchTransactions(data: zod.infer<typeof searchFormSchema>) {
    await fetchTransactions(data.query)
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
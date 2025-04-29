import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { getFees } from '../../services/apiFees'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { PAGE_SIZE } from '../../utils/constants'
import FeesRow from './FeesRow'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 2fr 2fr 2fr 2fr 0.5fr;
  column-gap: 0.5rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`

function FeesTable({ search = '' }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['fees'],
    queryFn: getFees,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading fees!</div>

  let filteredFees = data?.data || []

  if (search.trim() !== '') {
    filteredFees = filteredFees.filter((fee) => {
      const searchString =
        `${fee.id} ${fee.student?.name} ${fee.student?.last_name}`.toLowerCase()
      return searchString.includes(search.toLowerCase())
    })
  }

  const totalItems = filteredFees.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedFees = filteredFees.slice(start, end)

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div>ID</div>
          <div>Student Name</div>
          <div>Office Pay</div>
          <div>Office Paid</div>
          <div>Warranty Pay</div>
          <div>Total Fee</div>
          <div>Action</div>
        </TableHeader>

        {paginatedFees.map((fee) => (
          <FeesRow key={fee.id} fee={fee} />
        ))}

        {filteredFees.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching fees found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default FeesTable

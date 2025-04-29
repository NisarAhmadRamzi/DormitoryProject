import ComplaintsRow from './ComplaintsRow'
import { PAGE_SIZE } from '../../utils/constants'
import Pagination from '../../ui/Pagination'
import Spinner from '../../ui/Spinner'
import { getComplaints } from '../../services/apiComplaints'
import styled from 'styled-components'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 2fr 3fr 1.5fr 2fr 0.5fr;
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

function ComplaintsTable({ search }) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1

  const { isLoading, data, error } = useQuery({
    queryKey: ['complaints'],
    queryFn: getComplaints,
  })

  if (isLoading) return <Spinner />
  if (error) return <div>Error loading complaints!</div>

  let complaints = data?.data || []

  // Search functionality
  if (search.trim() !== '') {
    complaints = complaints.filter((c) => {
      const searchStr =
        `${c.id} ${c.title} ${c.description} ${c.status} ${c.student?.name}`.toLowerCase()
      return searchStr.includes(search.toLowerCase())
    })
  }

  const totalItems = complaints.length
  const start = (currentPage - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE
  const paginatedComplaints = complaints.slice(start, end)

  return (
    <>
      <Table role="table">
        <TableHeader role="row">
          <div>ID</div>
          <div>Student Name</div>
          <div>Title</div>
          <div>Status</div>
          <div>Created At</div>
          <div>Action</div>
        </TableHeader>

        {paginatedComplaints.map((complaint) => (
          <ComplaintsRow key={complaint.id} complaint={complaint} />
        ))}

        {complaints.length === 0 && (
          <div style={{ padding: '1.6rem' }}>No matching complaints found.</div>
        )}

        <Pagination count={totalItems} />
      </Table>
    </>
  )
}

export default ComplaintsTable

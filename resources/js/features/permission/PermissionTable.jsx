import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { getPermission } from '../../services/apiPermission'
import Spinner from '../../ui/Spinner'
import AddPermission from './AddPermission'
import PermissionRow from './PermissionRow'

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50]
const TopBarWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* Left align */
  align-items: center;
  padding: 1.6rem 2.4rem 0;
  gap: 2rem;
  flex-wrap: wrap;
`
const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 1.4fr 2fr 2fr 2fr 1fr;
  align-items: center;
  background-color: var(--color-grey-50);
  padding: 1.4rem 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.6rem;
  border-top: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  gap: 2rem;
`

const PageInfo = styled.div`
  font-weight: 500;
`

const RowsPerPage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  select {
    padding: 0.4rem 0.8rem;
    font-size: 1.4rem;
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    color: var(--color-grey-900);
  }
`

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  button {
    padding: 0.4rem 0.8rem;
    font-size: 2rem;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-sm);
    color: var(--color-grey-900);
    cursor: pointer;
    transition: background-color 0.2s, border-color 0.2s;

    &:hover:not(:disabled) {
      background-color: var(--color-grey-50);
      border-color: var(--color-grey-400);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`

function PermissionTable({ search = '' }) {
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data, isLoading, isError, error } = useQuery(
    ['permissions'],
    getPermission,
    {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    }
  )

  if (isLoading) return <Spinner />
  if (isError)
    return (
      <p>
        {t('errors.loading')} : {error.message}
      </p>
    )

  const permissions = Array.isArray(data?.data) ? data.data : []

  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalItems = filteredPermissions.length
  const totalPages = Math.ceil(totalItems / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const paginatedPermissions = filteredPermissions.slice(
    startIndex,
    startIndex + rowsPerPage
  )

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value))
    setCurrentPage(1)
  }

  if (filteredPermissions.length === 0) return <p>{t('permission.notFound')}</p>

  return (
    <>
      <TopBarWrapper>
        <AddPermission />
      </TopBarWrapper>
      <Table role="table">
        <TableHeader role="row">
          <div>{t('permission.id')}</div>
          <div>{t('permission.name')}</div>
          <div>{t('permission.createdAt')}</div>
          <div>{t('permission.updatedAt')}</div>
          <div>{t('permission.actions')}</div>
        </TableHeader>

        {paginatedPermissions.map((permission) => (
          <PermissionRow key={permission.id} permission={permission} />
        ))}
        <PaginationWrapper>
          <PageInfo>
            {t('page')} {currentPage} {t('of')} {totalPages || 1}
          </PageInfo>

          <RowsPerPage>
            {t('rowsPerPage')}
            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </RowsPerPage>

          <NavButtons>
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label={t('previousPage')}
            >
              &lt;
            </button>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages || totalPages === 0}
              aria-label={t('nextPage')}
            >
              &gt;
            </button>
          </NavButtons>
        </PaginationWrapper>
      </Table>
    </>
  )
}

export default PermissionTable

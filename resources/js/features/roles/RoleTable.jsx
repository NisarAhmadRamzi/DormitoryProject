import React from 'react'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { getRoles } from '../../services/apiRoles'
import Spinner from '../../ui/Spinner'
import RoleRow from './RoleRow'
import { useTranslation } from 'react-i18next'

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.2fr 4fr 1fr 1fr 1fr;
  align-items: center;
  background-color: var(--color-grey-50);
  padding: 1.4rem 1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-grey-600);
`

export default function RoleTable() {
  const { t } = useTranslation()
  const { data, isLoading, isError, error } = useQuery(['roles'], getRoles)

  if (isLoading) return <Spinner />
  if (isError)
    return <p>{t('roleTable.loadingError', { message: error.message })}</p>

  const roles = Array.isArray(data?.data) ? data.data : []

  if (roles.length === 0) return <p>{t('roleTable.noMatch')}</p>

  return (
    <Table role="table">
      <TableHeader role="row">
        <div>{t('roleTable.id')}</div>
        <div>{t('roleTable.name')}</div>
        <div>{t('roleTable.permissions')}</div>
        <div>{t('roleTable.createdAt')}</div>
        <div>{t('roleTable.updatedAt')}</div>
        <div>{t('roleTable.actions')}</div>
      </TableHeader>

      {roles.map((role) => (
        <RoleRow key={role.id} role={role} />
      ))}
    </Table>
  )
}

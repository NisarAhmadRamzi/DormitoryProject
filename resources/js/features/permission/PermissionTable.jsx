import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { hasPermission } from '../../components/permissions'
import { useUser } from '../../context/UserContext'
import { getPermission } from '../../services/apiPermission'
import Empty from '../../ui/Empty'
import Spinner from '../../ui/Spinner'
import AddPermission from './AddPermission'
import PermissionRow from './PermissionRow'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const StyledAddWrapper = styled.div`
  align-self: flex-end;

  & button {
    font-weight: 400; /* decrease the weight */
    font-size: 1.4rem;
    padding: 0.6rem 1.2rem;
  }
`

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.4fr 1.5fr 1.5fr 1.5fr ${(props) =>
      props.showActions ? '0.6fr' : '0'};
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`

const TableBody = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  margin: 1.2rem 0;
`

const PermissionTable = () => {
  const { t } = useTranslation()
  const { user } = useUser()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['permissions'],
    queryFn: getPermission,
  })

  const permissions = Array.isArray(data?.data) ? data.data : []

  const canEdit = hasPermission(user, 'edit permission')
  const canDelete = hasPermission(user, 'delete permission')
  const canAdd = hasPermission(user, 'create permission')

  const showActions = canEdit || canDelete

  if (isLoading) return <Spinner />
  if (isError) return <Empty message={t('error.loadingPermissions')} />

  return (
    <>
      {canAdd && (
        <Wrapper>
          <div></div>
          <StyledAddWrapper>
            <AddPermission />
          </StyledAddWrapper>
        </Wrapper>
      )}

      <Table role="table">
        <TableHeader role="row" showActions={showActions}>
          <div>{t('permission.id')}</div>
          <div>{t('permission.name')}</div>
          <div>{t('permission.createdAt')}</div>
          <div>{t('permission.updatedAt')}</div>
          {showActions && <div>{t('permission.actions')}</div>}
        </TableHeader>

        <TableBody>
          {permissions.length === 0 ? (
            <Empty message={t('permission.noPermissions')} />
          ) : (
            permissions.map((permission, index) => (
              <PermissionRow
                permission={permission}
                key={permission.id}
                index={index + 1}
                showActions={showActions}
              />
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default PermissionTable

// components/EditRoleForm.jsx
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { getPermissions, updateRole } from '../../services/apiRoles'
import Spinner from '../../ui/Spinner'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  font-size: 1.4rem;
`

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 600;
  color: var(--color-grey-700);
`

const TextInput = styled.input`
  padding: 0.8rem;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.75rem;
  max-height: 280px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-50);
`

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`

const Button = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1.4rem;
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: background-color 0.2s;

  &[type='submit'] {
    background-color: var(--color-brand-600);
    color: white;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  &[type='button'] {
    background-color: var(--color-grey-200);
    color: var(--color-grey-700);

    &:hover {
      background-color: var(--color-grey-300);
    }
  }
`

export default function EditRoleForm({ role, onCloseModal }) {
  const qc = useQueryClient()
  const { data: permRes, isLoading } = useQuery(['permissions'], getPermissions)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      name: role.name,
      permissions: role.permissions.map((p) => p.id),
    },
  })

  const { mutateAsync } = useMutation(updateRole, {
    onSuccess: () => {
      qc.invalidateQueries(['roles'])
      toast.success('Role updated')
      onCloseModal()
    },
    onError: (err) => toast.error(err.message || 'Update failed'),
  })

  if (isLoading) return <Spinner />

  const allPerms = permRes.data

  const onSubmit = (data) =>
    mutateAsync({ id: role.id, name: data.name, permissions: data.permissions })

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <Label htmlFor="role-name">Role Name</Label>
        <TextInput id="role-name" {...register('name', { required: true })} />
      </Fieldset>

      <Fieldset>
        <Label>Permissions</Label>
        <CheckboxGrid>
          {allPerms.map((p) => (
            <Label key={p.id}>
              <input
                type="checkbox"
                value={p.id}
                {...register('permissions')}
              />
              <span style={{ marginLeft: '0.5rem' }}>{p.name}</span>
            </Label>
          ))}
        </CheckboxGrid>
      </Fieldset>

      <Actions>
        <Button type="button" onClick={onCloseModal} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Save Changes'}
        </Button>
      </Actions>
    </Form>
  )
}

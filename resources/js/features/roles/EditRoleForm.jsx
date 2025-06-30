

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import styled from 'styled-components'
import { createRole, getPermissions, updateRole } from '../../services/apiRoles'
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

  // Use updateRole if role exists, else createRole
  const mutationFn = role ? updateRole : createRole

  const { mutateAsync, isLoading: isSubmitting } = useMutation(mutationFn, {
    onSuccess: () => {
      qc.invalidateQueries(['roles'])
      toast.success(role ? 'Role updated' : 'Role created')
      if (typeof onCloseModal === 'function') {
        onCloseModal()
      }
    },
    onError: (err) =>
      toast.error(err.message || (role ? 'Update failed' : 'Create failed')),
  })

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting: formSubmitting },
  } = useForm({
    defaultValues: {
      name: role?.name || '',
      permissions: role ? role.permissions.map((p) => p.id) : [],
    },
  })

  if (isLoading) return <Spinner />

  const allPerms = permRes.data

  const onSubmit = (data) => {
    if (role) {
      return mutateAsync({
        id: role.id,
        name: data.name,
        permissions: data.permissions,
      })
    } else {
      return mutateAsync({ name: data.name, permissions: data.permissions })
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset>
        <Label htmlFor="role-name">Role Name</Label>
        <TextInput id="role-name" {...register('name', { required: true })} />
      </Fieldset>

      <Fieldset>
        <Label>Permissions</Label>
        <CheckboxGrid>
          <Controller
            name="permissions"
            control={control}
            render={({ field }) => (
              <>
                {allPerms.map((p) => (
                  <Label key={p.id}>
                    <input
                      type="checkbox"
                      value={p.id}
                      checked={field.value.includes(p.id)}
                      onChange={(e) => {
                        const checked = e.target.checked
                        let newValue = []
                        if (checked) {
                          newValue = [...field.value, p.id]
                        } else {
                          newValue = field.value.filter((id) => id !== p.id)
                        }
                        field.onChange(newValue)
                      }}
                    />
                    <span style={{ marginLeft: '0.5rem' }}>{p.name}</span>
                  </Label>
                ))}
              </>
            )}
          />
        </CheckboxGrid>
      </Fieldset>

      <Actions>
        <Button type="button" onClick={onCloseModal} disabled={formSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={formSubmitting}>
          {formSubmitting ? 'Saving…' : role ? 'Save Changes' : 'Create Role'}
        </Button>
      </Actions>
    </Form>
  )
}

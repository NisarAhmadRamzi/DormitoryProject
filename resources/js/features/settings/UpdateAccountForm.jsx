import { useEffect, useState } from 'react'

import styled from 'styled-components'
import Button from '../../ui/Button'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Row from '../../ui/Row'
import { useAccount } from './useAccount'
import { useUpdateAccount } from './useUpdateAccount'

const ProfilePreview = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid var(--color-grey-300);
`

const DeleteButton = styled.button`
  background: red;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const FileInput = styled.input`
  margin-top: 0.5rem;
`

function UpdateAccountForm() {
  const { isLoading, error, account } = useAccount()
  const {
    isUpdating,
    updateProfile,
    isDeletingPhoto,
    deleteProfilePhoto,
    isUpdatingPassword,
    updatePassword,
  } = useUpdateAccount()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [photoPreview, setPhotoPreview] = useState(null)

  // Password state
  const [passwords, setPasswords] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  })

  useEffect(() => {
    if (account) {
      setName(account.name || '')
      setEmail(account.email || '')
      setPhotoPreview(account?.profile ? `/uploads/${account.profile}` : null)
    }
  }, [account])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading account data</p>

  const handleBlur = (field, value) => {
    if (!account) return
    if (account[field] === value) return
    const updatedData = { [field]: value, email, name }
    updateProfile(updatedData)
  }

  const handleDeletePhoto = () => {
    setShowConfirmDelete(true)
  }

  const handleConfirmDelete = () => {
    deleteProfilePhoto()
    setShowConfirmDelete(false)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    // Preview the selected image
    setPhotoPreview(URL.createObjectURL(file))
    // TODO: Implement uploading the new photo file via API (if needed)
  }

  const handlePasswordChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwords.password !== passwords.password_confirmation) {
      alert("New password and confirmation don't match")
      return
    }
    updatePassword(passwords)
    setPasswords({
      current_password: '',
      password: '',
      password_confirmation: '',
    })
  }

  return (
    <>
      <Form>
        <Row>
          <FormRow label="Profile Photo">
            {photoPreview ? (
              <>
                <ProfilePreview
                  src={photoPreview}
                  alt={`${name || 'User'}'s profile`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://www.gravatar.com/avatar/?d=mp&f=y'
                  }}
                />
                <DeleteButton
                  type="button"
                  onClick={handleDeletePhoto}
                  disabled={isUpdating || isDeletingPhoto}
                >
                  {isDeletingPhoto ? 'Deleting...' : 'Delete Photo'}
                </DeleteButton>
              </>
            ) : (
              <p>No profile photo uploaded.</p>
            )}
            <FileInput
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              disabled={isUpdating || isDeletingPhoto}
            />
          </FormRow>
        </Row>
        <FormRow label="Full name">
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name', name)}
            disabled={isUpdating || isDeletingPhoto}
          />
        </FormRow>

        <FormRow label="Email">
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email', email)}
            disabled={isUpdating || isDeletingPhoto}
          />
        </FormRow>
      </Form>

      <Form onSubmit={handlePasswordSubmit}>
        <FormRow label="Current Password">
          <Input
            type="password"
            name="current_password"
            value={passwords.current_password}
            onChange={handlePasswordChange}
            disabled={isUpdatingPassword}
            required
          />
        </FormRow>
        <FormRow label="New Password">
          <Input
            type="password"
            name="password"
            value={passwords.password}
            onChange={handlePasswordChange}
            disabled={isUpdatingPassword}
            required
          />
        </FormRow>
        <FormRow label="Confirm New Password">
          <Input
            type="password"
            name="password_confirmation"
            value={passwords.password_confirmation}
            onChange={handlePasswordChange}
            disabled={isUpdatingPassword}
            required
          />
        </FormRow>
        <Button
          type="submit"
          disabled={isUpdatingPassword}
          style={{ marginTop: '1rem' }}
        >
          {isUpdatingPassword ? 'Updating...' : 'Update Password'}
        </Button>
      </Form>

      {showConfirmDelete && (
        <ConfirmDelete
          resourceName="profile photo"
          itemLabel={name}
          onConfirm={handleConfirmDelete}
          onCloseModal={() => setShowConfirmDelete(false)}
          message="Are you sure you want to delete your profile photo?"
          subMessage="This action cannot be undone."
        />
      )}
    </>
  )
}

export default UpdateAccountForm

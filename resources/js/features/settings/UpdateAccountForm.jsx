import { useEffect, useState } from 'react'

import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import styled from 'styled-components'
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

const FileInput = styled.input`
  margin-top: 0.5rem;
`

function UpdateAccountForm() {
  const { isLoading, error, account } = useAccount()
  const { isUpdating, updateProfile } = useUpdateAccount()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)

  // Initialize state when account loads
  useEffect(() => {
    if (account) {
      setName(account.name || '')
      setEmail(account.email || '')
      // Photo preview uses /uploads path like your UserAvatar component
      setPhotoPreview(account.profile ? `/uploads/${account.profile}` : null)
    }
  }, [account])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading account data</p>

  // Update profile on name or email blur
  const handleBlur = (field, value) => {
    if (!account) return
    if (account[field] === value) return

    // Prepare data for update
    const data = new FormData()
    data.append(field, value)
    data.append('name', field === 'name' ? value : name)
    data.append('email', field === 'email' ? value : email)
    if (photoFile) {
      data.append('profile', photoFile)
    }

    updateProfile(data)
  }

  // Handle photo file selection and preview
  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setPhotoFile(file)

    // Preview image locally
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result)
    }
    reader.readAsDataURL(file)

    // Upload immediately after selecting new photo
    // We send name, email along with photo
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('profile', file)
    updateProfile(data)
  }

  return (
    <Form>
      <FormRow label="Full name">
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => handleBlur('name', name)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Email">
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => handleBlur('email', email)}
          disabled={isUpdating}
        />
      </FormRow>

      <FormRow label="Profile Photo">
        {photoPreview ? (
          <ProfilePreview
            src={photoPreview}
            alt={`${name || 'User'}'s profile`}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://www.gravatar.com/avatar/?d=mp&f=y'
            }}
          />
        ) : (
          <p>No profile photo uploaded.</p>
        )}
        <FileInput
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          disabled={isUpdating}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateAccountForm

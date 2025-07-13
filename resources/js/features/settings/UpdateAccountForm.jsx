// import { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { useTranslation } from 'react-i18next'
// import styled from 'styled-components'

// import Button from '../../ui/Button'
// import Form from '../../ui/Form'
// import Row from '../../ui/Row'
// import Spinner from '../../ui/Spinner'
// import { useAccount } from './useAccount'
// import { useUpdateAccount } from './useUpdateAccount'

// // Styled Components
// const FlexContainer = styled.div`
//   display: flex;
//   gap: 2.4rem;
//   justify-content: space-between;
//   width: 100%;
//   padding: 2rem;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 1rem;
//   }
// `

// const LeftColumn = styled.div`
//   flex: 1;
//   max-width: 50%;

//   @media (max-width: 768px) {
//     max-width: 100%;
//   }
// `

// const RightColumn = styled.div`
//   flex: 1;
//   max-width: 50%;

//   @media (max-width: 768px) {
//     max-width: 100%;
//   }
// `

// const FileInput = styled.input`
//   margin-top: 1rem;
// `

// const ButtonWrapper = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;
//   flex-wrap: wrap;
//   align-items: center;
// `

// const ProfilePreview = styled.img`
//   width: 200px;
//   height: 200px;
//   object-fit: cover;
//   margin-bottom: 1rem;
//   border: 2px solid var(--color-grey-300);
//   background-color: var(--color-grey-0);
// `

// const Input = styled.input`
//   width: 100%;
//   padding: 0.8rem 1.2rem;
//   font-size: 1.3rem;
//   color: var(--color-grey-900);
//   background-color: var(--color-grey-0);
//   border: 1px solid
//     ${(props) =>
//       props.error ? 'var(--color-red-700)' : 'var(--color-grey-300)'};
//   border-radius: 8px;
//   box-shadow: var(--shadow-sm);
//   transition: border-color 0.2s, box-shadow 0.2s, background-color 0.3s;

//   &:focus {
//     border-color: var(--color-blue-700);
//     outline: none;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
//   }

//   &:disabled {
//     background-color: var(--color-grey-100);
//     color: var(--color-grey-500);
//     cursor: not-allowed;
//   }
// `

// const DeleteButton = styled.button`
//   background: var(--color-red-600);
//   color: white;
//   padding: 0.6rem 1.4rem;
//   border: none;
//   border-radius: 8px;
//   font-weight: 500;
//   font-size: 1rem;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: var(--color-red-700);
//   }

//   &:disabled {
//     opacity: 0.6;
//     cursor: not-allowed;
//   }
// `

// const Label = styled.label`
//   font-weight: 600;
//   color: var(--color-grey-700);
//   margin-bottom: 0.4rem;
//   display: inline-block;
// `

// const Error = styled.span`
//   color: var(--color-red-700);
//   font-size: 0.875rem;
//   margin-top: 0.25rem;
// `

// const StyledFormRow = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: 1.6rem;
// `

// const ButtonGroup = styled.div`
//   display: flex;
//   gap: 1rem;
//   flex-wrap: wrap;
//   margin-top: 1rem;
// `

// function FormRow({ label, error, children }) {
//   const id = children?.props?.id
//   return (
//     <StyledFormRow>
//       {label && <Label htmlFor={id}>{label}</Label>}
//       {children}
//       {error && <Error>{error}</Error>}
//     </StyledFormRow>
//   )
// }

// function UpdateAccountForm() {
//   const { t } = useTranslation()
//   const { isLoading, error, account } = useAccount()
//   const {
//     isUpdating,
//     updateProfile,
//     isDeletingPhoto,
//     deleteProfilePhoto,
//     isUpdatingPassword,
//     updatePassword,
//   } = useUpdateAccount()

//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [photoPreview, setPhotoPreview] = useState(null)
//   const [photoFile, setPhotoFile] = useState(null)

//   const [passwords, setPasswords] = useState({
//     current_password: '',
//     password: '',
//     password_confirmation: '',
//   })

//   useEffect(() => {
//     if (account) {
//       setName(account.name || '')
//       setEmail(account.email || '')
//       setPhotoPreview(account?.profile ? `/uploads/${account.profile}` : null)
//     }
//   }, [account])

//   if (isLoading) return <Spinner />
//   if (error) return <p>{t('accountForm.loadError')}</p>

//   const handleBlur = (field, value) => {
//     if (!account || account[field] === value) return
//     const updatedData = { [field]: value, email, name }
//     updateProfile(updatedData)
//   }

//   const handleDeletePhoto = () => {
//     deleteProfilePhoto()
//   }

//   const handlePhotoUpload = () => {
//     if (!photoFile) {
//       toast.error(t('accountForm.noPhotoError'))
//       return
//     }

//     const formData = new FormData()
//     formData.append('profile', photoFile)
//     formData.append('name', name)
//     formData.append('email', email)

//     updateProfile(formData)
//   }

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0]
//     if (!file) return
//     setPhotoPreview(URL.createObjectURL(file))
//     setPhotoFile(file)
//   }

//   const handlePasswordChange = (e) => {
//     setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handlePasswordSubmit = (e) => {
//     e.preventDefault()
//     if (passwords.password !== passwords.password_confirmation) {
//       alert(t('accountForm.passwordMismatch'))
//       return
//     }
//     updatePassword(passwords)
//     setPasswords({
//       current_password: '',
//       password: '',
//       password_confirmation: '',
//     })
//   }

//   return (
//     <FlexContainer>
//       <LeftColumn>
//         <Form>
//           <Row />
//           <FormRow label={t('accountForm.fullName')}>
//             <Input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               onBlur={() => handleBlur('name', name)}
//               disabled={isUpdating || isDeletingPhoto}
//             />
//           </FormRow>

//           <FormRow label={t('accountForm.email')}>
//             <Input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onBlur={() => handleBlur('email', email)}
//               disabled={isUpdating || isDeletingPhoto}
//             />
//           </FormRow>
//         </Form>

//         <Form onSubmit={handlePasswordSubmit}>
//           <FormRow label={t('accountForm.currentPassword')}>
//             <Input
//               type="password"
//               name="current_password"
//               value={passwords.current_password}
//               onChange={handlePasswordChange}
//               disabled={isUpdatingPassword}
//               required
//             />
//           </FormRow>
//           <FormRow label={t('accountForm.newPassword')}>
//             <Input
//               type="password"
//               name="password"
//               value={passwords.password}
//               onChange={handlePasswordChange}
//               disabled={isUpdatingPassword}
//               required
//             />
//           </FormRow>
//           <FormRow label={t('accountForm.confirmNewPassword')}>
//             <Input
//               type="password"
//               name="password_confirmation"
//               value={passwords.password_confirmation}
//               onChange={handlePasswordChange}
//               disabled={isUpdatingPassword}
//               required
//             />
//           </FormRow>
//           <Button
//             type="submit"
//             disabled={isUpdatingPassword}
//             style={{ marginTop: '1rem' }}
//           >
//             {isUpdatingPassword
//               ? t('accountForm.updating')
//               : t('accountForm.updatePassword')}
//           </Button>
//         </Form>
//       </LeftColumn>

//       <RightColumn>
//         <FormRow label={t('accountForm.profilePhoto')}>
//           <ProfilePreview
//             src={
//               photoPreview
//                 ? photoPreview
//                 : 'https://www.gravatar.com/avatar/?d=mp&f=y'
//             }
//             alt={`${name || 'User'}'s profile`}
//             onError={(e) => {
//               e.target.onerror = null
//               e.target.src = 'https://www.gravatar.com/avatar/?d=mp&f=y'
//             }}
//           />

//           <ButtonGroup>
//             <DeleteButton
//               type="button"
//               onClick={handleDeletePhoto}
//               disabled={isUpdating || isDeletingPhoto}
//             >
//               {isDeletingPhoto
//                 ? t('accountForm.deleting')
//                 : t('accountForm.deletePhoto')}
//             </DeleteButton>

//             <Button
//               type="button"
//               onClick={handlePhotoUpload}
//               disabled={isUpdating}
//             >
//               {isUpdating
//                 ? t('accountForm.uploading')
//                 : t('accountForm.updatePhoto')}
//             </Button>
//           </ButtonGroup>

//           <FileInput
//             type="file"
//             accept="image/*"
//             onChange={handlePhotoChange}
//             disabled={isUpdating || isDeletingPhoto}
//           />
//         </FormRow>
//       </RightColumn>
//     </FlexContainer>
//   )
// }

// export default UpdateAccountForm

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Row from '../../ui/Row'
import Spinner from '../../ui/Spinner'
import { useAccount } from './useAccount'
import { useUpdateAccount } from './useUpdateAccount'

// Styled Components
const FlexContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`

const LeftColumn = styled.div`
  flex: 1;
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const RightColumn = styled.div`
  flex: 1;
  max-width: 50%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const FileInput = styled.input`
  margin-top: 1rem;
`

const ProfilePreview = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 2px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
`

const Input = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.3rem;
  color: var(--color-grey-900);
  background-color: var(--color-grey-0);
  border: 1px solid
    ${(props) =>
      props.error ? 'var(--color-red-700)' : 'var(--color-grey-300)'};
  border-radius: 8px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.2s, box-shadow 0.2s, background-color 0.3s;

  &:focus {
    border-color: var(--color-blue-700);
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }

  &:disabled {
    background-color: var(--color-grey-100);
    color: var(--color-grey-500);
    cursor: not-allowed;
  }
`

const Label = styled.label`
  font-weight: 600;
  color: var(--color-grey-700);
  margin-bottom: 0.4rem;
  display: inline-block;
`

const Error = styled.span`
  color: var(--color-red-700);
  font-size: 0.875rem;
  margin-top: 0.25rem;
`

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.6rem;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 1rem;
`

const DeleteButton = styled.button`
  background: var(--color-red-600);
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-red-700);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

function FormRow({ label, error, children }) {
  const id = children?.props?.id
  return (
    <StyledFormRow>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

function UpdateAccountForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()

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
  const [photoPreview, setPhotoPreview] = useState(null)
  const [photoFile, setPhotoFile] = useState(null)

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

  if (isLoading) return <Spinner />
  if (error) return <p>{t('accountForm.loadError')}</p>

  const handleBlur = (field, value) => {
    if (!account || account[field] === value) return
    const updatedData = { [field]: value, email, name }
    updateProfile(updatedData)
  }

  const handleDeletePhoto = () => {
    deleteProfilePhoto()
  }

  const handlePhotoUpload = () => {
    if (!photoFile) {
      toast.error(t('accountForm.noPhotoError'))
      return
    }

    const formData = new FormData()
    formData.append('profile', photoFile)
    formData.append('name', name)
    formData.append('email', email)

    updateProfile(formData)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setPhotoPreview(URL.createObjectURL(file))
    setPhotoFile(file)
  }

  const handlePasswordChange = (e) => {
    setPasswords((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (passwords.password !== passwords.password_confirmation) {
      alert(t('accountForm.passwordMismatch'))
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
    <FlexContainer>
      <LeftColumn>
        <Form>
          <Row />
          <FormRow label={t('accountForm.fullName')}>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name', name)}
              disabled={isUpdating || isDeletingPhoto}
            />
          </FormRow>

          <FormRow label={t('accountForm.email')}>
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
          <FormRow label={t('accountForm.currentPassword')}>
            <Input
              type="password"
              name="current_password"
              value={passwords.current_password}
              onChange={handlePasswordChange}
              disabled={isUpdatingPassword}
              required
            />
          </FormRow>
          <FormRow label={t('accountForm.newPassword')}>
            <Input
              type="password"
              name="password"
              value={passwords.password}
              onChange={handlePasswordChange}
              disabled={isUpdatingPassword}
              required
            />
          </FormRow>
          <FormRow label={t('accountForm.confirmNewPassword')}>
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
            {isUpdatingPassword
              ? t('accountForm.updating')
              : t('accountForm.updatePassword')}
          </Button>
        </Form>

        {/* ✅ Go to Dashboard Button */}
        <Button
          type="button"
          onClick={() => navigate('/dashboard')}
          style={{ marginTop: '2rem' }}
        >
          {t('accountForm.goToDashboard')}
        </Button>
      </LeftColumn>

      <RightColumn>
        <FormRow label={t('accountForm.profilePhoto')}>
          <ProfilePreview
            src={
              photoPreview
                ? photoPreview
                : 'https://www.gravatar.com/avatar/?d=mp&f=y'
            }
            alt={`${name || 'User'}'s profile`}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'https://www.gravatar.com/avatar/?d=mp&f=y'
            }}
          />

          <ButtonGroup>
            <DeleteButton
              type="button"
              onClick={handleDeletePhoto}
              disabled={isUpdating || isDeletingPhoto}
            >
              {isDeletingPhoto
                ? t('accountForm.deleting')
                : t('accountForm.deletePhoto')}
            </DeleteButton>

            <Button
              type="button"
              onClick={handlePhotoUpload}
              disabled={isUpdating}
            >
              {isUpdating
                ? t('accountForm.uploading')
                : t('accountForm.updatePhoto')}
            </Button>
          </ButtonGroup>

          <FileInput
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            disabled={isUpdating || isDeletingPhoto}
          />
        </FormRow>
      </RightColumn>
    </FlexContainer>
  )
}

export default UpdateAccountForm

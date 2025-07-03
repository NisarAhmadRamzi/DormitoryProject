import { formatDistanceToNow } from 'date-fns'
import { enUS, faIR } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import Heading from '../../ui/Heading'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 80vh;
  overflow-y: auto;
`

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
  gap: 2.4rem;
`

const DetailItem = styled.div`
  background-color: var(--color-grey-50);
  padding: 1.2rem;
  border-radius: 6px;
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`

const Label = styled.span`
  font-weight: 600;
  color: var(--color-grey-600);
  font-size: 1.4rem;
`

const Value = styled.span`
  color: var(--color-grey-800);
  font-size: 1.6rem;
  word-break: break-word;
`

function LibraryStudentDetails({ student }) {
  const { t, i18n } = useTranslation()

  if (!student)
    return (
      <p>{t('libraryStudentDetails.noData') || 'No student data available.'}</p>
    )

  // Determine locale based on current language
  const locale = i18n.language === 'fa' ? faIR : enUS

  return (
    <StyledDetails>
      <Heading as="h3">
        {t('libraryStudentDetails.heading') || 'Library Student Details'}
      </Heading>
      <DetailsGrid>
        <DetailItem>
          <Label>{t('libraryStudentDetails.id') || 'ID'}</Label>
          <Value>{student.id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.libraryId') || 'Library ID'}</Label>
          <Value>{student.library_id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.fullName') || 'Full Name'}</Label>
          <Value>
            {student.name} {student.last_name}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.email') || 'Email'}</Label>
          <Value>{student.email}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.phone') || 'Phone'}</Label>
          <Value>{student.phone}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.idNumber') || 'ID Number'}</Label>
          <Value>{student.id_number}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.address') || 'Address'}</Label>
          <Value>{student.address}</Value>
        </DetailItem>

        <DetailItem>
          <Label>
            {t('libraryStudentDetails.academicInfo') || 'Academic Information'}
          </Label>
          <Value>{student.academic_info}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.gender') || 'Gender'}</Label>
          <Value>{student.gender}</Value>
        </DetailItem>

        <DetailItem>
          <Label>
            {t('libraryStudentDetails.membershipStatus') || 'Membership Status'}
          </Label>
          <Value>{student.membership_status}</Value>
        </DetailItem>

        <DetailItem>
          <Label>
            {t('libraryStudentDetails.registrationDate') || 'Registration Date'}
          </Label>
          <Value>
            {new Date(student.registration_date).toLocaleDateString()}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>
            {t('libraryStudentDetails.registrationDeadline') ||
              'Registration Deadline'}
          </Label>
          <Value>
            {new Date(student.registration_deadline).toLocaleDateString()}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.createdAt') || 'Created At'}</Label>
          <Value>
            {formatDistanceToNow(new Date(student.created_at), {
              addSuffix: true,
              locale,
            })}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('libraryStudentDetails.updatedAt') || 'Updated At'}</Label>
          <Value>
            {formatDistanceToNow(new Date(student.updated_at), {
              addSuffix: true,
              locale,
            })}
          </Value>
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default LibraryStudentDetails

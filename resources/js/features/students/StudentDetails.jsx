// import { useTranslation } from 'react-i18next'
// import styled from 'styled-components'
// import Heading from '../../ui/Heading'

// const StyledDetails = styled.div`
//   background-color: var(--color-grey-0);
//   padding: 2.4rem;
//   border-radius: 8px;
//   box-shadow: var(--shadow-md);
//   max-height: 80vh; /* Limit height */
//   overflow-y: auto; /* Scroll inside the modal if content is too long */
// `

// const DetailsGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
//   gap: 2.4rem;
// `

// const DetailItem = styled.div`
//   background-color: var(--color-grey-50);
//   padding: 1.2rem;
//   border-radius: 6px;
//   box-shadow: var(--shadow-sm);
//   display: flex;
//   flex-direction: column;
//   gap: 0.4rem;
// `

// const Label = styled.span`
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-size: 1.4rem;
// `

// const Value = styled.span`
//   color: var(--color-grey-800);
//   font-size: 1.6rem;
//   word-break: break-word;
// `

// function StudentDetails({ student }) {
//   const { t } = useTranslation()

//   if (!student) return <p>{t('studentDetails.noData')}</p>

//   const {
//     id,
//     name,
//     email,
//     f_name,
//     last_name,
//     from,
//     dob,
//     id_number,
//     academic_info,
//     phone,
//     gender,
//     registration_date,
//     registration_deadline,
//     created_at,
//     updated_at,
//     room,
//     fee,
//   } = student

//   return (
//     <StyledDetails>
//       <Heading as="h3">{t('studentDetails.title')}</Heading>

//       <DetailsGrid>
//         <DetailItem>
//           <Label>{t('studentDetails.id')}</Label>
//           <Value>{id}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.username')}</Label>
//           <Value>{name}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.fatherName')}</Label>
//           <Value>{f_name}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.lastName')}</Label>
//           <Value>{last_name}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.email')}</Label>
//           <Value>{email}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.idNumber')}</Label>
//           <Value>{id_number}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.phone')}</Label>
//           <Value>{phone}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.gender')}</Label>
//           <Value>{gender}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.dob')}</Label>
//           <Value>{dob}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.from')}</Label>
//           <Value>{from}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.academicInfo')}</Label>
//           <Value>{academic_info}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.registrationDate')}</Label>
//           <Value>{registration_date}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.registrationDeadline')}</Label>
//           <Value>{registration_deadline}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.roomInfo')}</Label>
//           <Value>
//             {room
//               ? `Room ${room.room_number} (${room.type}), Floor: ${room.floor}`
//               : t('studentDetails.noRoom')}
//           </Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.feeInfo')}</Label>
//           <Value>
//             {fee
//               ? `Total Fee: $${fee.total_fee}, Paid: $${
//                   fee.office_paid
//                 }, Due: $${fee.total_fee - fee.office_paid}`
//               : t('studentDetails.noFee')}
//           </Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.createdAt')}</Label>
//           <Value>{created_at}</Value>
//         </DetailItem>

//         <DetailItem>
//           <Label>{t('studentDetails.updatedAt')}</Label>
//           <Value>{updated_at}</Value>
//         </DetailItem>
//       </DetailsGrid>
//     </StyledDetails>
//   )
// }

// export default StudentDetails

import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import dayjs from '../../locales/dayjsConfig' // Use your centralized dayjs config
import Heading from '../../ui/Heading'

const StyledDetails = styled.div`
  background-color: var(--color-grey-0);
  padding: 2.4rem;
  border-radius: 8px;
  box-shadow: var(--shadow-md);
  max-height: 80vh; /* Limit height */
  overflow-y: auto; /* Scroll inside the modal if content is too long */
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

function StudentDetails({ student }) {
  const { t, i18n } = useTranslation()

  if (!student) return <p>{t('studentDetails.noData')}</p>

  const {
    id,
    name,
    email,
    f_name,
    last_name,
    from,
    dob,
    id_number,
    academic_info,
    phone,
    gender,
    registration_date,
    registration_deadline,
    created_at,
    updated_at,
    room,
    fee,
  } = student

  // Set dayjs locale based on current language for proper relative time translations
  dayjs.locale(i18n.language === 'ps' ? 'ps' : i18n.language)

  return (
    <StyledDetails>
      <Heading as="h3">{t('studentDetails.title')}</Heading>

      <DetailsGrid>
        <DetailItem>
          <Label>{t('studentDetails.id')}</Label>
          <Value>{id}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.username')}</Label>
          <Value>{name}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.fatherName')}</Label>
          <Value>{f_name}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.lastName')}</Label>
          <Value>{last_name}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.email')}</Label>
          <Value>{email}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.idNumber')}</Label>
          <Value>{id_number}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.phone')}</Label>
          <Value>{phone}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.gender')}</Label>
          <Value>{gender}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.dob')}</Label>
          <Value>{dob}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.from')}</Label>
          <Value>{from}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.academicInfo')}</Label>
          <Value>{academic_info}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.registrationDate')}</Label>
          <Value>{registration_date}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.registrationDeadline')}</Label>
          <Value>{registration_deadline}</Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.roomInfo')}</Label>
          <Value>
            {room
              ? `Room ${room.room_number} (${room.type}), Floor: ${room.floor}`
              : t('studentDetails.noRoom')}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.feeInfo')}</Label>
          <Value>
            {fee
              ? `Total Fee: $${fee.total_fee}, Paid: $${
                  fee.office_paid
                }, Due: $${fee.total_fee - fee.office_paid}`
              : t('studentDetails.noFee')}
          </Value>
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.createdAt')}</Label>
          <Value>{dayjs(created_at).fromNow()}</Value>{' '}
          {/* <-- relative time here */}
        </DetailItem>

        <DetailItem>
          <Label>{t('studentDetails.updatedAt')}</Label>
          <Value>{dayjs(updated_at).fromNow()}</Value>{' '}
          {/* <-- relative time here */}
        </DetailItem>
      </DetailsGrid>
    </StyledDetails>
  )
}

export default StudentDetails

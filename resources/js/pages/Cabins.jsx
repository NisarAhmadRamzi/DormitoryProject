import { useEffect } from 'react'
import CabinsTable from '../features/cabins/CabinTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'

// import { getCabins } from '../services/apiCabins'

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data))
  }, [])
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p style={{ textAlign: 'right' }}>Filter/Sort</p>
      </Row>
      <Row>
        <CabinsTable />
      </Row>
    </>
  )
}

export default Cabins

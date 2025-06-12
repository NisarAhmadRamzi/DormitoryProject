<<<<<<< HEAD
import styled from 'styled-components'
import AddLibrary from '../features/libraries/AddLibrary'
import LibraryTable from '../features/libraries/LibraryTable'
=======
>>>>>>> fffccedc1909da34b379a33916755cec06894013
import Heading from '../ui/Heading'
import LibraryTable from '../features/libraries/LibraryTable'
import Row from '../ui/Row'
import styled from 'styled-components'

function Libraries() {
  return (
    <>
<<<<<<< HEAD
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Libraries
        </Heading>
        <LibraryTable />
        <AddLibrary />
=======
      <Heading as="h1" style={{ marginBottom: '5px' }}>
        Libraries
      </Heading>
      <Row>
        <LibraryTable />
>>>>>>> fffccedc1909da34b379a33916755cec06894013
      </Row>
    </>
  )
}

export default Libraries

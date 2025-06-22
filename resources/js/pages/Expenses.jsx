import AddExpenses from '../features/expenses/AddExpenses'
import ExpenseTable from '../features/expenses/ExpensesTable'
import Heading from '../ui/Heading'
import Row from '../ui/Row'
import styled from 'styled-components'
import { useState } from 'react'

function Expenses() {
  return (
    <>
      <Row>
        <Heading as="h1" style={{ textAlign: 'center' }}>
          Expenses
        </Heading>
        <ExpenseTable />
        <AddExpenses />
      </Row>
    </>
  )
}

export default Expenses
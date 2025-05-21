import Filter from '../../ui/Filter'

const RoomTableOperations = () => {
  return (
    <Filter
      filterField="price"
      options={[
        { value: 'all', label: 'All' },
        { value: 'no-price', label: 'No prices' },
        { value: 'with-price', label: 'With price' },
      ]}
    />
  )
}

export default RoomTableOperations

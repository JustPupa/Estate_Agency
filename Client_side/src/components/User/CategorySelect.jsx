function CategorySelect ({catlist, filter, setFilter}) {
  return (
    <select onChange={(e) => setFilter({...filter, category:e.target.value})}>
      <option value='0' key='0'>Все</option>
        {catlist.map((i) => (
            <option value={i.id} key={i.id}>
                {i.name}
            </option>
        ))}
    </select>
  )
}

export default CategorySelect
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import React from "react"

const CategorySelector = ({ cat, setCat, categories, setPage }) => {
  const handleChange = (event) => {
    setCat(event.target.value)
    setPage(1)
  }

  if (categories.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <Box width={200}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cat}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((category, i) => (
            <MenuItem value={category} key={i}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

export default CategorySelector

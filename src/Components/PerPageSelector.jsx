import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

const PerPageSelector = ({ cardPerPage, setCardPerPages }) => {
  const handleChange = (event) => {
    setCardPerPages(event.target.value)
  }

  return (
    <Box width={200}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Per page</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cardPerPage}
          label="Per page"
          onChange={handleChange}
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={12}>10</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}
export default PerPageSelector

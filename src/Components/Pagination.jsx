import React from "react"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"
import PropTypes from "prop-types"

const PaginationItem = ({ countPages, page, setPage }) => {
  const handleChange = (event, value) => {
    setPage(value)
  }

  return (
    <Stack spacing={2}>
      <Pagination count={countPages} page={page} onChange={handleChange} />
    </Stack>
  )
}

PaginationItem.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default PaginationItem

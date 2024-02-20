import { movies$ } from "../movies"
import { useEffect, useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import Stack from "@mui/material/Stack"
import { Box } from "@mui/material"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import IconButton from "@mui/material/IconButton"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import ProgressBar from "./ProgressBar"
import ClearIcon from "@mui/icons-material/Clear"
import CategorySelector from "./CategorySelector"
import PaginationItem from "./Pagination"
import PerPageSelector from "./PerPageSelector"

// eslint-disable-next-line max-lines-per-function
const Movies = () => {
  const [movies, setMovies] = useState([])
  const [displayedMovies, setDisplayedMovies] = useState([])
  const [cat, setCat] = useState("")
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [countPages, setCountPages] = useState(0)
  const [cardPerPages, setCardPerPages] = useState(4)

  useEffect(() => {
    movies$.then((data) => setMovies(data))
  }, [])

  useEffect(() => {
    if (cat === "") {
      setDisplayedMovies(
        movies.slice((page - 1) * cardPerPages, page * cardPerPages),
      )
      setCountPages(Math.ceil(movies.length / cardPerPages))
    } else {
      const filteredMovies = movies.filter((movie) => movie.category === cat)
      setDisplayedMovies(
        filteredMovies.slice((page - 1) * cardPerPages, page * cardPerPages),
      )
      setCountPages(Math.ceil(filteredMovies.length / cardPerPages))
    }
  }, [cat, movies, page, cardPerPages])

  useEffect(() => {
    const dataCat = []
    movies.forEach((movie) => {
      if (!dataCat.includes(movie.category)) {
        dataCat.push(movie.category)
      }
    })
    setCategories(dataCat)
  }, [movies])

  const handleDeleteClick = (movieId) => {
    setMovies(movies.filter((movie) => movie.id !== movieId))
  }
  const handleLike = (event) => {
    const movieId = event.currentTarget.getAttribute("data-id")
    const movie = movies.find((dataMovie) => dataMovie.id === movieId)
    movie.likes += 1
    setMovies([...movies])
  }
  const handleDislike = (event) => {
    const movieId = event.currentTarget.getAttribute("data-id")
    const movie = movies.find((dataMovie) => dataMovie.id === movieId)
    movie.dislikes += 1
    setMovies([...movies])
  }

  return (
    <div className="h-screen flex flex-col justify-center bg-gray-100 items-center gap-4 overflow-y-auto">
      <Stack direction="row" useFlexGap spacing={4} top={0}>
        <CategorySelector
          cat={cat}
          setCat={setCat}
          categories={categories}
          setPage={setPage}
        />
        <PerPageSelector
          cardPerPages={cardPerPages}
          setCardPerPages={setCardPerPages}
        />
      </Stack>
      <Stack
        spacing={4}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        justifyContent="center"
      >
        {displayedMovies.map((movie) => (
          <div key={movie.id}>
            <Card sx={{ maxWidth: 345, minWidth: 250 }}>
              <CardContent>
                <Stack direction="column" useFlexGap flexWrap="wrap">
                  <Box sx={{ alignSelf: "flex-end" }}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteClick(movie.id)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </Box>
                  <Typography sx={{ mb: 1.5 }} gutterBottom>
                    <b>{movie.title}</b>
                  </Typography>
                  <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {movie.category}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <ProgressBar
                      likes={movie.likes}
                      dislikes={movie.dislikes}
                    />
                  </Box>
                </Stack>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="like"
                  onClick={handleLike}
                  data-id={movie.id}
                >
                  <Box sx={{ mr: 1 }}>{movie.likes}</Box>
                  <ThumbUpIcon />
                </IconButton>

                <IconButton
                  aria-label="dislike"
                  data-id={movie.id}
                  onClick={handleDislike}
                >
                  <Box sx={{ mr: 1 }}>{movie.dislikes}</Box>
                  <ThumbDownIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
      </Stack>
      <PaginationItem countPages={countPages} page={page} setPage={setPage} />
    </div>
  )
}

export default Movies

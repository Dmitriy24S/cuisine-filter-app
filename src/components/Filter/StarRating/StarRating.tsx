import { Box, Button, FormLabel } from '@mui/material'
import { useEffect, useState } from 'react'
import { FilterSettings } from '../../../App'

type Props = {
  filterSettings: FilterSettings
  updateFilterSettings: (newFilterSettings: FilterSettings) => void
}

const StarRating = ({ filterSettings, updateFilterSettings }: Props) => {
  const [ratingValue, setRatingValue] = useState<number | undefined>(
    filterSettings.rating
  )
  const FiveStars = Array.from(Array(5))

  const handleRatingChange = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    // console.log('handleRatingChange e:', e)
    // textContent: "4"
    // value: "3 star rating"
    const selectedRating = Number((e.target as HTMLElement).textContent)

    if (!selectedRating) {
      return
    }

    if (selectedRating === ratingValue) {
      // unselect if already selected
      setRatingValue(undefined)
    } else {
      // select if not already selected
      setRatingValue(selectedRating)
    }
  }

  // const handleRatingSelection = () => {
  //   updateFilterSettings({
  //     ...filterSettings,
  //     rating: ratingValue,
  //   })
  // }

  // TODO: reduce useffects?
  useEffect(() => {
    updateFilterSettings({
      ...filterSettings,
      rating: ratingValue,
    })
  }, [ratingValue])

  return (
    <Box my={3} display='flex' flexDirection='column' gap='1rem'>
      <FormLabel component='legend'>Rating</FormLabel>
      <Box display='flex' gap='1rem'>
        {FiveStars.map((_, index) => {
          return (
            <Button
              key={index}
              variant='contained'
              sx={{
                padding: '0.5rem',
                minWidth: '2rem',
                lineHeight: '1',
                backgroundColor:
                  ratingValue === index + 1 ? 'rgb(255, 148, 30)' : '#556cd6',
                '&:hover': {
                  backgroundColor:
                    ratingValue === index + 1 ? 'rgb(244, 141, 31)' : 'rgb(59, 75, 149)',
                },
              }}
              onClick={handleRatingChange}
            >
              {index + 1}
            </Button>
          )
        })}
      </Box>
    </Box>
  )
}

export default StarRating

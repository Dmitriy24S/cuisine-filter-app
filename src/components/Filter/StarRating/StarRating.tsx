import { Box, FormLabel, IconButton } from '@mui/material'
import { MouseEvent } from 'react'
import { AiFillStar } from 'react-icons/ai'

type Props = {
  ratingValue: number | undefined
  handleRatingChange: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const StarRating = ({ ratingValue = 0, handleRatingChange }: Props) => {
  const FiveStars = Array.from(Array(5))

  return (
    <Box my={3} display='flex' flexDirection='column' gap='0.5rem'>
      <FormLabel
        component='legend'
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.2rem',
        }}
      >
        Rating
      </FormLabel>
      <Box display='flex' gap='0.2rem'>
        {FiveStars.map((_, index) => {
          return (
            // ver2 icon button:
            <IconButton key={index} value={index + 1} onClick={handleRatingChange}>
              <AiFillStar fill={ratingValue >= index + 1 ? '#ff941e' : '#bbb'} />
            </IconButton>
            // ver1 button:
            // <Button
            //   key={index}
            //   variant='contained'
            //   sx={{
            //     padding: '0.5rem',
            //     minWidth: '2rem',
            //     lineHeight: '1',
            //     backgroundColor:
            //       ratingValue === index + 1 ? 'rgb(255, 148, 30)' : '#556cd6',
            //     '&:hover': {
            //       backgroundColor:
            //         ratingValue === index + 1 ? 'rgb(244, 141, 31)' : 'rgb(59, 75, 149)',
            //     },
            //   }}
            //   onClick={handleRatingChange}
            // >
            //   {index + 1}
            // </Button>
          )
        })}
      </Box>
    </Box>
  )
}

export default StarRating

import { Box, Button, FormLabel, Typography } from '@mui/material'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

type Props = {
  sortOrder: 'ASC' | 'DESC'
  changeSortOrder: () => void
}

const ServiceTimeSort = ({ sortOrder, changeSortOrder }: Props) => {
  return (
    <Box display='flex' gap='0.5rem' alignItems='center'>
      <FormLabel>Service time</FormLabel>
      <Button onClick={changeSortOrder}>
        <Typography>
          {sortOrder === 'ASC' ? (
            <Box component='span' display='flex' gap='0.3rem' alignItems='center'>
              Fast
              <BsArrowUp />
            </Box>
          ) : (
            <Box component='span' display='flex' gap='0.3rem' alignItems='center'>
              Slow
              <BsArrowDown />
            </Box>
          )}
        </Typography>
      </Button>
    </Box>
  )
}

export default ServiceTimeSort

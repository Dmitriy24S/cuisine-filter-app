import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material'
import { ChangeEvent } from 'react'

type Props = {
  cuisineValues: 'American' | 'Chinese' | 'Italian' | string[]
  handleCuisineChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CuisineCheckboxes = ({ cuisineValues, handleCuisineChange }: Props) => {
  return (
    <FormControl sx={{ my: 2 }} component='fieldset' variant='standard'>
      <FormLabel component='legend'>Cuisine</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={cuisineValues.includes('american')}
              onChange={handleCuisineChange}
              name='american'
            />
          }
          label='American'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cuisineValues.includes('italian')}
              onChange={handleCuisineChange}
              name='italian'
            />
          }
          label='Italian'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={cuisineValues.includes('chinese')}
              onChange={handleCuisineChange}
              name='chinese'
            />
          }
          label='Chinese'
        />
      </FormGroup>
    </FormControl>
  )
}

export default CuisineCheckboxes

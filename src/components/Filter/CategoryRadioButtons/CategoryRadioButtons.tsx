import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material'
import { MouseEvent } from 'react'

type Props = {
  handleCategoryChange: (e: MouseEvent<HTMLButtonElement>) => void
  categoryValue: string | undefined
}

const CategoryRadioButtons = ({ categoryValue, handleCategoryChange }: Props) => {
  return (
    <FormControl>
      <FormLabel id='categories-radio-buttons-group-label'>Category</FormLabel>
      <RadioGroup
        row
        aria-labelledby='categories'
        name='row-radio-buttons-group'
        // value={categoryValue}
      >
        <FormControlLabel
          value='dish'
          checked={categoryValue === 'dish'}
          control={
            <Radio
              onClick={(e) => {
                handleCategoryChange(e)
                console.log('1111')
              }}
              // onKeyDown={(e) => {
              //   console.log('e', e)
              //   if (e.code === 'Space') {
              //     handleCategoryChange(e)
              //   }
              // }}
            />
          }
          label='Dish'
        />
        <FormControlLabel
          value='place'
          checked={categoryValue === 'place'}
          control={<Radio onClick={handleCategoryChange} />}
          label='Place'
        />
      </RadioGroup>
    </FormControl>
  )
}

export default CategoryRadioButtons

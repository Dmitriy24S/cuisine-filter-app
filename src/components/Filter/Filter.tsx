import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
} from '@mui/material'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { VscClearAll } from 'react-icons/vsc'
import { FilterSettings } from '../../App'
import { useDebounce } from '../../hooks/useDebounce'
import Slider from './Slider/Slider'

type Props = {
  filterSettings: FilterSettings
  updateFilterSettings: (newFilterSettings: FilterSettings) => void
}

const Filter = ({ filterSettings, updateFilterSettings }: Props) => {
  const [categoryValue, setCategoryValue] = useState<string>('')
  const [cuisineValues, setCuisineValues] = useState<string[]>([])
  const [sliderValue, setSliderValue] = useState([1, 50])
  const debouncedSearchValue = useDebounce<number[]>(sliderValue, 1000)

  const handleSliderValueChange = (value: number[]) => {
    setSliderValue(value) // value: [100, 314]
  }

  // Reset filter settings
  const resetFilterSettings = () => {
    updateFilterSettings({
      ...filterSettings,
      category: undefined,
      cuisine: undefined,
      price: undefined,
      rating: undefined,
      serviceTime: undefined,
      // title: undefined,
    })
    // setCategoryValue(undefined)
    setSliderValue([1, 50])
    setCategoryValue('')
    setCuisineValues([])
  }

  const handleCategoryChange = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedCategoryValue = (e.target as HTMLButtonElement).value

    if (selectedCategoryValue === categoryValue) {
      setCategoryValue('')

      updateFilterSettings({
        ...filterSettings,
        category: undefined,
      })
    } else {
      setCategoryValue(selectedCategoryValue)
      updateFilterSettings({
        ...filterSettings,
        category: selectedCategoryValue,
      })
    }
  }

  const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCuisineValue = e.target.name

    if (cuisineValues.includes(selectedCuisineValue)) {
      setCuisineValues((prev) => prev.filter((item) => item !== selectedCuisineValue))
    } else {
      setCuisineValues([...cuisineValues, selectedCuisineValue])
    }
  }

  // Update filter settings with cuisine setting
  useEffect(() => {
    updateFilterSettings({
      ...filterSettings,
      cuisine: cuisineValues,
    })
  }, [cuisineValues])

  // Update filter settings with slider value
  useEffect(() => {
    updateFilterSettings({
      ...filterSettings,
      price: debouncedSearchValue as number[],
    })
  }, [debouncedSearchValue])

  return (
    <Box padding={2} maxWidth={255} position='relative'>
      {/* Category Radio Buttons Container */}
      <Box display='flex' flexDirection='row-reverse' gap={2} alignItems='start'>
        {/* Reset fitler button */}
        <Tooltip title='Reset filters'>
          <IconButton onClick={resetFilterSettings} sx={{ fontSize: '1.3rem' }}>
            <VscClearAll />
          </IconButton>
        </Tooltip>
        {/* Category radio buttons */}
        <FormControl>
          <FormLabel id='categories-radio-buttons-group-label'>Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby='categories'
            name='row-radio-buttons-group'
            value={categoryValue}
          >
            <FormControlLabel
              value='dish'
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
              control={<Radio onClick={handleCategoryChange} />}
              label='Place'
            />
          </RadioGroup>
        </FormControl>
      </Box>

      {/* Cuisine checkboxes */}
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
      {/* Price range slider */}
      <Slider
        sliderValue={sliderValue}
        handleSliderValueChange={handleSliderValueChange}
      />
    </Box>
  )
}

export default Filter

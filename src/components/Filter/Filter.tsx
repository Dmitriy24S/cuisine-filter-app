import { Box, IconButton, Tooltip } from '@mui/material'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react'
import { VscClearAll } from 'react-icons/vsc'
import { FilterSettings } from '../../App'
import { useDebounce } from '../../hooks/useDebounce'
import CategoryRadioButtons from './CategoryRadioButtons/CategoryRadioButtons'
import CuisineCheckboxes from './CuisineCheckboxes/CuisineCheckboxes'
import PriceSlider from './PriceSlider/PriceSlider'
import ServiceTimeSort from './ServiceTimeSort/ServiceTimeSort'
import StarRating from './StarRating/StarRating'

type Props = {
  filterSettings: FilterSettings
  updateFilterSettings: (newFilterSettings: FilterSettings) => void
}

const Filter = ({ filterSettings, updateFilterSettings }: Props) => {
  // const { price } = filterSettings
  // Category state
  const [categoryValue, setCategoryValue] = useState<string | undefined>(
    filterSettings.category
  )

  const handleCategoryChange = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedCategoryValue = (e.target as HTMLButtonElement).value

    if (selectedCategoryValue === categoryValue) {
      // unselect if already selected
      setCategoryValue(undefined)
      updateFilterSettings({
        ...filterSettings,
        category: undefined,
      })
    } else {
      // select if new selection
      setCategoryValue(selectedCategoryValue)
      updateFilterSettings({
        ...filterSettings,
        category: selectedCategoryValue,
      })
    }

    // ! unselect not update / not work this way?
    // updateFilterSettings({
    //   ...filterSettings,
    //   category: selectedCategoryValue,
    // })
  }

  // Cuisine state
  const [cuisineValues, setCuisineValues] = useState<
    'American' | 'Chinese' | 'Italian' | string[]
  >(filterSettings.cuisine || [])

  const handleCuisineChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedCuisineValue = e.target.name

    if (cuisineValues.includes(selectedCuisineValue)) {
      setCuisineValues((prev) =>
        [...prev].filter((item) => item !== selectedCuisineValue)
      )
    } else {
      setCuisineValues([...cuisineValues, selectedCuisineValue])
    }

    // Update filter settings with cuisine setting
    // ! out of sync this way?
    // updateFilterSettings({
    //   ...filterSettings,
    //   cuisine: cuisineValues,
    // })
  }

  // Update filter settings with cuisine setting
  useEffect(() => {
    updateFilterSettings({
      ...filterSettings,
      cuisine: cuisineValues,
    })
  }, [cuisineValues])

  // Price slider state
  const [sliderValue, setSliderValue] = useState<number[]>(
    filterSettings.price || [1, 50]
  )
  const debouncedPriceRange = useDebounce<number[]>(sliderValue, 1000)

  const handleSliderValueChange = (value: number[]) => {
    setSliderValue(value) // value: [100, 314]
  }

  // Update filter settings with price range slider value
  useEffect(() => {
    if (
      debouncedPriceRange[0] === 1 &&
      debouncedPriceRange[1] === 50 &&
      !filterSettings.price
    ) {
      return // prevent additional filter state update if reset to initial state -> ignore debounced update for price range slider?
    }

    console.log('price range useffect, debouncedPriceRange:', debouncedPriceRange)

    updateFilterSettings({
      ...filterSettings,
      price: debouncedPriceRange as number[],
    })
  }, [debouncedPriceRange])

  // Rating filter
  const [ratingValue, setRatingValue] = useState<number | undefined>(
    filterSettings.rating
  )

  const handleRatingChange = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    // console.log('handleRatingChange e:', e)
    const selectedRating = Number(e.currentTarget.value)

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

  // Update rating filter setting
  useEffect(() => {
    updateFilterSettings({
      ...filterSettings,
      rating: ratingValue,
    })
  }, [ratingValue])

  // Sort by serving time
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>(filterSettings.sortOrder)

  const changeSortOrder = () => {
    if (sortOrder === 'ASC') {
      setSortOrder('DESC')
      updateFilterSettings({
        ...filterSettings,
        sortOrder: 'DESC',
      })
    } else {
      setSortOrder('ASC')
      updateFilterSettings({
        ...filterSettings,
        sortOrder: 'ASC',
      })
    }
  }

  // Reset filter settings state
  const resetFilterSettings = () => {
    updateFilterSettings({
      ...filterSettings,
      category: undefined,
      cuisine: undefined,
      price: undefined,
      rating: undefined,
      serviceTime: undefined,
      // title: undefined,
      sortOrder: 'ASC',
    })
    setSliderValue([1, 50])
    setCategoryValue(undefined)
    setCuisineValues([])
    setRatingValue(undefined)
    setSortOrder('ASC')
  }

  return (
    <Box padding={2} maxWidth={255} position='relative'>
      {/* Container - Category radio buttons & reset button  */}
      <Box display='flex' flexDirection='row-reverse' gap={2} alignItems='start'>
        {/* Reset fitler button */}
        <Tooltip title='Reset filters'>
          <IconButton onClick={resetFilterSettings} sx={{ fontSize: '1.3rem' }}>
            <VscClearAll />
          </IconButton>
        </Tooltip>
        {/* Category radio buttons */}
        <CategoryRadioButtons
          categoryValue={categoryValue}
          handleCategoryChange={handleCategoryChange}
        />
      </Box>
      {/* Cuisine checkboxes */}
      <CuisineCheckboxes
        cuisineValues={cuisineValues}
        handleCuisineChange={handleCuisineChange}
      />
      {/* Price range slider */}
      <PriceSlider
        sliderValue={sliderValue}
        handleSliderValueChange={handleSliderValueChange}
      />
      {/* Star rating */}
      <StarRating ratingValue={ratingValue} handleRatingChange={handleRatingChange} />
      {/* Service time sort */}
      <ServiceTimeSort sortOrder={sortOrder} changeSortOrder={changeSortOrder} />
    </Box>
  )
}

export default Filter

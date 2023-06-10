import {
  Box,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useEffect, useState } from 'react'
import './App.css'
// import { Counter } from './components/Counter/Counter'
import { BsFilterLeft } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import Filter from './components/Filter/Filter'
import List from './components/List/List'
import Search from './components/Search/Search'
import { data as rawData } from './data/data'

export interface FilterSettings {
  category: 'place' | 'dish' | string | undefined
  cuisine: 'American' | 'Chinese' | 'Italian' | undefined | string[]
  price: number[] | undefined
  rating: string | undefined
  title: string | undefined
  serviceTime: string | undefined
}

export interface Data {
  id: number
  title: string
  serviceTime: string
  deliveryFee: number
  category: string
  cuisine: string | string[]
  rating: number
  price: number
  imgSrc: string
}

const initialFilterSettings = {
  category: undefined,
  cuisine: undefined,
  rating: undefined,
  title: undefined,
  serviceTime: undefined,
  price: [1, 50],
}

function App() {
  console.count('App render')
  const [data, setData] = useState<Data[]>(rawData)
  const [filterSettings, setFilterSettings] =
    useState<FilterSettings>(initialFilterSettings)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')

  const toggleFilterMenu = () => {
    setIsFilterMenuOpen((prev) => !prev)
  }

  const updateFilterSettings = (newFilterSettings: FilterSettings) => {
    setFilterSettings(newFilterSettings)
  }

  // Filter data when filter settings update
  useEffect(() => {
    console.count('App useffect filterSettings render')

    const filteredData = rawData.filter((element) => {
      const isCategoryMatch =
        filterSettings.category === undefined ||
        filterSettings.category === '' ||
        element.category.includes(
          filterSettings.category || (filterSettings.title as string)
        )
      // console.log('isCategoryMatch', isCategoryMatch, element.category)

      const isCuisineMatch =
        filterSettings.cuisine === undefined ||
        filterSettings.cuisine.length === 0 ||
        (filterSettings.cuisine &&
          filterSettings.cuisine.includes(element.cuisine as string))
      // console.log('isCuisineMatch', isCuisineMatch, element.cuisine)

      const isPriceMatch = filterSettings.price
        ? element.price >= filterSettings.price[0] &&
          element.price <= filterSettings.price[1]
        : true
      // console.log('isPriceMatch', isPriceMatch, element.price)

      const isTitleMatch =
        filterSettings.title === undefined ||
        element.title.toLowerCase().includes(filterSettings.title.toLowerCase())
      // console.log('isTitleMatch', isTitleMatch, element.title)

      const isRatingMatch = Number(element.rating) >= Number(filterSettings.price)
      // console.log('isRatingMatch', isRatingMatch, element.rating)

      const isServiceTimeMatch =
        filterSettings.serviceTime === undefined ||
        element.serviceTime.toLowerCase().includes(filterSettings.serviceTime)
      // console.log('isServiceTimeMatch', isServiceTimeMatch)

      // console.log(
      //   'isCategoryMatch || isCuisineMatch || isPriceMatch || isRatingMatch || isTitleMatch',
      //   isCategoryMatch ||
      //     isCuisineMatch ||
      //     isPriceMatch ||
      //     isRatingMatch ||
      //     isTitleMatch ||
      //     isServiceTimeMatch
      // )

      return isTitleMatch && isPriceMatch && isCategoryMatch && isCuisineMatch
    })
    console.log('useEffect filterSettings:', filterSettings)
    console.log('filtersetign useffect filteredData:', filteredData)

    setData(filteredData)
  }, [filterSettings])

  return (
    <div className='App'>
      <Box display='flex' gap={1} alignItems='center'>
        {isMobile && (
          <Tooltip title='Filter menu'>
            <IconButton onClick={toggleFilterMenu} sx={{ marginLeft: '8px' }}>
              <BsFilterLeft />
            </IconButton>
          </Tooltip>
        )}

        <Search
          filterSettings={filterSettings}
          updateFilterSettings={updateFilterSettings}
        />
      </Box>

      <Box display='flex' gap={2}>
        {/* Mobile Filter Menu */}
        {isMobile && (
          <Drawer anchor='left' open={isFilterMenuOpen} onClose={toggleFilterMenu}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              gap={2}
              p={2}
            >
              <Typography fontWeight={600} fontSize='1.2rem'>
                Fitler menu
              </Typography>
              <Tooltip title='Close menu'>
                <IconButton onClick={toggleFilterMenu} sx={{ fontSize: '18px' }}>
                  <GrClose />
                </IconButton>
              </Tooltip>
            </Box>
            <Filter
              filterSettings={filterSettings}
              updateFilterSettings={updateFilterSettings}
            />
          </Drawer>
        )}
        {/* Dekstop Filter Menu */}
        {!isMobile && (
          <Filter
            filterSettings={filterSettings}
            updateFilterSettings={updateFilterSettings}
          />
        )}
        <List data={data} />
      </Box>

      {/* <Counter /> */}
    </div>
  )
}

export default App

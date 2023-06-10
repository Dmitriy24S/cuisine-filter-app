import { Box, Input, InputLabel } from '@mui/material'
import { ChangeEvent, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FilterSettings } from '../../App'
import { useDebounce } from '../../hooks/useDebounce'

type Props = {
  filterSettings: FilterSettings
  updateFilterSettings: (newFilterSettings: FilterSettings) => void
}

const Search = ({ filterSettings, updateFilterSettings }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const debouncedSearchValue = useDebounce<string>(searchValue, 1000)

  useEffect(() => {
    if (debouncedSearchValue.trim() === '') {
      updateFilterSettings({
        ...filterSettings,
        title: undefined,
        // category: undefined,
        // cuisine: undefined,
        // price: undefined,
        // rating: undefined,
        // serviceTime: undefined,
      })
    } else {
      const updatedFilterValues = {
        ...filterSettings,
        title: debouncedSearchValue,
        // category: debouncedSearchValue.toLocaleLowerCase(),
        // category: debouncedSearchValue,
        // cuisine: debouncedSearchValue,
        // price: debouncedSearchValue,
        // rating: debouncedSearchValue,
        // serviceTime: debouncedSearchValue,
      }

      updateFilterSettings(updatedFilterValues)
    }
  }, [debouncedSearchValue])

  return (
    <Box padding={2} display='flex' alignItems='start' gap={2} maxWidth='400px'>
      <InputLabel htmlFor='search-input'>
        <Box color='#888888' fontSize='18px' paddingTop='8px'>
          <BsSearch />
        </Box>
      </InputLabel>
      <Input
        id='search-input'
        type='search'
        placeholder='Search'
        fullWidth
        disableUnderline
        sx={{
          fontSize: '1.3rem',
          fontWeight: 600,
          '& .MuiInput-input': {
            padding: '5px',
          },
          '& .MuiInput-input::placeholder': {
            fontWeight: 400,
          },
        }}
        onChange={handleChange}
        value={searchValue}
      />
    </Box>
  )
}

export default Search

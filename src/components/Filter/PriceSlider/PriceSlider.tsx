import { Box, FormLabel, TextField } from '@mui/material'
import SliderMUI, { SliderThumb } from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'

type Props = {
  sliderValue: number[]
  handleSliderValueChange: (value: number[]) => void
}

const PriceSlider = ({ sliderValue, handleSliderValueChange }: Props) => {
  const [values, setValues] = useState(sliderValue)

  useEffect(() => {
    handleSliderValueChange(values)
  }, [values])

  return (
    <>
      <FormLabel component='legend' sx={{ mb: 3.2 }}>
        Price range $
      </FormLabel>
      {/* Slider */}
      <AirbnbSlider
        value={sliderValue}
        valueLabelDisplay='on'
        slots={{
          thumb: AirbnbThumbComponent,
        }}
        min={1}
        max={100}
        onChange={(_e, value) => {
          setValues(value as number[])
        }}
        sx={{
          ml: 1,
          my: 2,
          maxWidth: '200px',
        }}
      />
      <Box display='flex' gap={1}>
        <TextField
          id='outlined-basic'
          label='Min. value'
          variant='outlined'
          value={sliderValue[0]}
          type='number'
          onChange={(e) => {
            setValues((prev) => [Number(e.target.value), prev[1]])
          }}
        />
        <TextField
          id='outlined-basic'
          label='Max. value'
          variant='outlined'
          type='number'
          value={sliderValue[1]}
          onChange={(e) => {
            setValues((prev) => [prev[0], Number(e.target.value)])
          }}
        />
      </Box>
    </>
  )
}

export default PriceSlider

// slider components

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

const AirbnbSlider = styled(SliderMUI)(({ theme }) => ({
  color: '#4363c3',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 68, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    color: theme.palette.text.primary,
    '&:before': {
      display: 'none',
    },
    '& *': {
      background: 'transparent',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    },
  },
}))

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props
  return (
    <SliderThumb {...other}>
      {children}
      <span className='airbnb-bar' />
      <span className='airbnb-bar' />
      <span className='airbnb-bar' />
    </SliderThumb>
  )
}

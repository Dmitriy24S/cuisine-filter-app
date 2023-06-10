import { Box, Typography } from '@mui/material'
import { AiFillStar } from 'react-icons/ai'
import { Data } from '../../../App'

type Props = {
  data: Data
}

const Item = ({ data }: Props) => {
  // const [isActiveHover, setIsActiveHover] = useState(false)

  // const handleMouseEnter = () => {
  //   setIsActiveHover(true)
  // }

  // const handleMouseLeave = () => {
  //   setIsActiveHover(false)
  // }

  return (
    <Box
      borderRadius='4px'
      overflow='hidden'
      // sx={{
      //   transition: 'box-shadow 300ms ease-out',
      //   '&:hover': {
      //     boxShadow: '0px 0px 11px 0px rgb(0 0 0 / 10%)',
      //   },
      // }}
    >
      {/* Image Container */}
      <Box
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        height='200px'
        overflow='hidden'
        position='relative'
        // borderRadius='4px'
        // display='flex'
      >
        {/* Image */}
        {/* <Box */}
        {/* sx={{ */}
        {/* transition: 'transform ease 360ms', */}
        {/* transform: isActiveHover ? 'scale(1.05)' : 'scale(1)', */}
        {/* }} */}
        {/* > */}
        <img src={data.imgSrc} alt={data.title} loading='lazy' />
        {/* </Box> */}
        {/* Cuisine */}
        <Typography
          position='absolute'
          left='1rem'
          top='0.5rem'
          color='white'
          fontWeight={500}
          textTransform='capitalize'
          className='text-outline'
        >
          {data.cuisine}
        </Typography>
        {/* Service time */}
        {/* <Fade in={isActiveHover} timeout={500}> */}
        <Typography
          position='absolute'
          right='1rem'
          top='0.5rem'
          color='white'
          fontWeight={500}
          className='text-outline'
        >
          {data.serviceTime}
        </Typography>
        {/* </Fade> */}
      </Box>
      <Box padding={1.5}>
        <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>
          {/* Title */}
          <Typography
            variant='h2'
            fontSize='1.3rem'
            fontWeight={600}
            textTransform='capitalize'
          >
            {data.title}
          </Typography>
          {/* Rating */}
          <Box display='flex' alignItems='center' gap={0.5}>
            <AiFillStar fill='#ff941e' />
            <Typography fontSize='1.3rem' fontWeight={600}>
              {data.rating}
            </Typography>
          </Box>
        </Box>
        <Box display='flex' justifyContent='space-between' alignItems='center' gap={2}>
          {/* Delivery fee */}
          {/* <Fade in={isActiveHover} timeout={300}> */}
          <Typography fontSize='0.9rem' color='#7c7c7c'>
            Delivery fee: {data.deliveryFee}
          </Typography>
          {/* </Fade> */}
          {/* Price */}
          <Typography fontWeight={700} fontSize='1.1rem'>
            {data.price.toFixed(2)} <Box component='span'>$</Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Item

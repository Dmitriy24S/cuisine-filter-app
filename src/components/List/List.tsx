import { Box, Typography } from '@mui/material'
import { Data } from '../../App'
import Item from './Item/Item'

type Props = {
  data: Data[]
}

const List = ({ data }: Props) => {
  if (data.length === 0) {
    return (
      <Box width='100%'>
        <Typography textAlign='center' component='h2' fontSize='2rem' fontWeight={600}>
          No results
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      display={'grid'}
      gridTemplateColumns={'repeat(auto-fill, minmax(250px, 1fr))'}
      gap={4}
      padding={2}
      width='100%'
    >
      {data.map((element) => (
        <Box key={element.id} display='flex' flexDirection='column'>
          <Item data={element} />
        </Box>
      ))}
    </Box>
  )
}

export default List

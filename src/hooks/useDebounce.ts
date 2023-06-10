import { useEffect, useState } from 'react'

export const useDebounce = <T extends string | number[]>(value: any, delay = 1000): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value as T)
  let timerId: number

  useEffect(() => {
    timerId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerId)
    }
  }, [value])

  if (typeof debouncedValue === 'string') {
    return debouncedValue.toLocaleLowerCase() as T
  }

  return debouncedValue

  // return typeof debouncedValue === 'string'
  // ? debouncedValue.toLocaleLowerCase()
  // : debouncedValue
}

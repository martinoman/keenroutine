export const increment1 = () => ({
  type: 'INCREMENT_COUNTER1',
  value: 1
})

export const increment2 = () => ({
  type: 'INCREMENT_COUNTER2',
  value: 1
})

export const loadPlace = (place, key) => ({
  type: 'LOAD_PLACE',
  place: place,
  key: key,
})

export const loadUser = user => ({
  type: 'LOAD_USER',
  user: user
})

export const removePlace = key => ({
    type: 'REMOVE_PLACE',
    key: key,
})

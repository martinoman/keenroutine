export const increment1 = () => ({
  type: 'INCREMENT_COUNTER1',
  value: 1
})

export const increment2 = () => ({
  type: 'INCREMENT_COUNTER2',
  value: 1
})

export const loadPlace = place => ({
  type: 'LOAD_PLACE',
  place: place
})

export const loadUser = user => ({
  type: 'LOAD_USER',
  user: user
})

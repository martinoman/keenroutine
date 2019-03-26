export const changeLocation = location => ({
  type: 'CHANGE_LOCATION',
  location: location
})

export const focusTrip = trip => ({
  type: 'FOCUS_TRIP',
  trip: trip
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

export const clearState = () => ({
    type: "CLEAR_STATE",
})

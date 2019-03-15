export const changeLocation = location => ({
  type: 'CHANGE_LOCATION',
  location: location
})

export const focusTrip = trip => ({
  type: 'FOCUS_TRIP',
  trip: trip
})

export const loadPlaces = places => ({
  type: 'LOAD_PLACE',
  places: places
})

export const loadUser = user => ({
  type: 'LOAD_USER',
  user: user
})

export const markers = (state, action) => {
  if(typeof state === 'undefined') return []
  switch(action.type) {
    case 'ADD_MARKER':
      return [...state, action.marker]
  }
  return state
}

/**
* Function for removing dulicates from the collection
* @param {Array{}} state Original array of unique objects
* @param {Array{}} payload Array of objects with possible duplicates
* @return {Array{}} An updated array of unique objects
*/

export default function removeDublicatesById(state, payload) {
  const idsOfState = state.map((post) => post.id);
  return payload.filter(({ id }) => !idsOfState.includes(id));
}

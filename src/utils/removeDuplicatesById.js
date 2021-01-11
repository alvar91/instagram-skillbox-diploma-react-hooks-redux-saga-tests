export default function removeDublicatesById(state, payload) {
  const idsOfState = state.map((post) => post.id);
  return payload.filter(({ id }) => !idsOfState.includes(id));
}

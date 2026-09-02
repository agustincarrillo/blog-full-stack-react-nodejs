export const getPosts = async (queryParams) => {
  // Se puede usar la funcion fetch para hacer priciones a un servidor.
  // Se utiliza la clase URLSearchParams para convertir un objeto en
  // query params validos.
  console.log('BUSCA LOS POSTS')
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/posts?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const createPost = async (post) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  })
  return await res.json()
}

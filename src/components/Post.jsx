import PropTypes from 'prop-types'

export function Post({ title, contents, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

// PropTypes son usadas para validar las props pasadas a los
// componentes React y para asegurar que se pasen las props
// correctas cuando se use JavaScripts.
Post.propTypes = {
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
}

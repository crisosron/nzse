// This renders an error page for errors that are not 404
const Error = ({ statusCode }) => {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 500
  return { statusCode }
  // TODO: If we wanted to log errors, here would be a nice place to do it
}

export default Error
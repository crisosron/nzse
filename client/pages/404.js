const Error404 = () => {
  // TODO: Add Layout component to apply body spacing styles
  return (
    <div className="prose">
      <h1>404</h1>
      <bold>Looks like the page you were looking for doesn't exist.</bold>
      <p>Try a different URL, or go back to the <a href="/">homepage</a>.</p>
    </div>
  )
};

export default Error404;
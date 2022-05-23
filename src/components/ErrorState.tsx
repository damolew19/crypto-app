import { Link } from 'react-router-dom';

function ErrorState() {
  return (
    <div>
      <h1>Sorry we have an error!</h1>
      <Link to='/'>Refresh Page here</Link>
    </div>
  );
}

export default ErrorState;

import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <Layout title="404">
      <section className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-100 mb-4">
          Page Not Found 
        </h2>
        <p className="text-slate-400 text-lg mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
        >
          Go Back Home
        </Link>
      </section>
    </Layout>
  );
};

export default NotFound;

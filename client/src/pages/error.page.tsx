import clsx from 'clsx';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <section
      className={clsx(
        'w-100 h-100',
        'bg-dark',
        'd-flex justify-content-center align-items-center flex-column'
      )}
      style={{ background: 'url(/imgs/night-neon.jpg) center center / cover' }}
    >
      <div className="glitch-1-movement">
        <h2 className="glitch-1-content glitch-1-layers glitch-1-font" data-text="ERROR">
          <span>ERROR</span>
        </h2>
      </div>

      <div className="error-page-effect text-danger">
        <span className="pendulum">4</span>04 Page Not Found
      </div>

      <Link to="/" className="monoton-regular text-white fs-1 text-neon-effect-3 cursor-pointer">
        CLICK HERE TO HOME!
      </Link>
    </section>
  );
}

export default ErrorPage;

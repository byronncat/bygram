import clsx from 'clsx';

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
      {/* <h2 className="container-glitch-1 glitch layers" data-text="xinc haof"> */}
      <div className="glitch-1-movement">
        <h2 className="glitch-1-content glitch-1-layers glitch-1-font" data-text="xinc haof">
          <span>xinc haof</span>
        </h2>
      </div>

      <div className="error-page-effect">
        <span className="pendulum">4</span>04 Page Not Found
      </div>

      <div className="monoton-regular text-white fs-1 text-neon-effect-3">SUPERSONIC</div>
    </section>
  );
}

export default ErrorPage;

import { track } from '../utils/track';

const WhoHiredMe = () => {
  return (
    <section className="who-hired-me-wrap container">
      <h2>Who's Hired Me</h2>
      <div className="logo-wrap">
        <div>
          <svg className="logo microsoft">
            <use xlinkHref="#microsoft"></use>
          </svg>
        </div>
        <div>
          <svg className="logo ea">
            <use xlinkHref="#ea"></use>
          </svg>
        </div>
        <div>
          <svg className="logo citi">
            <use xlinkHref="#citi"></use>
          </svg>
        </div>
        <div>
          <svg className="logo dell">
            <use xlinkHref="#dell"></use>
          </svg>
        </div>
        <div>
          <svg className="logo acuvue">
            <use xlinkHref="#acuvue"></use>
          </svg>
        </div>
      </div>
      <div className="whm-cta-wrap">
        <a
          className="whm-cta"
          href="/portfolio"
          onClick={() => track('cta_click', 'who-hired-me')}
        >
          See the work I did for them
        </a>
      </div>
    </section>
  )
}

export default WhoHiredMe
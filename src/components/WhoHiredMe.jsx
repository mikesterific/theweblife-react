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
    </section>
  )
}

export default WhoHiredMe
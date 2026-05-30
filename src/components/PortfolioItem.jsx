const PortfolioItem = ({ item }) => {
  const desktopHref = item.hrefDesktop || item.demoPath;
  const mobileHref = item.hrefMobile || desktopHref;
  const hasDemoLink = mobileHref && desktopHref;

  return (
    <article className="port-article">
      <h2>{item.title}</h2>
      <div className="p-img-wrap">
        <picture>
          {item.wideSrcset && <source media="(min-width: 1024px)" srcSet={item.wideSrcset} />}
          {item.srcset && <source media="(max-width: 1023px)" srcSet={item.srcset} />}
          <img src={item.wideImg || item.img} loading="lazy" alt={item.alt} />
        </picture>
      </div>
      {hasDemoLink && (
        <p className="pa-btn-wrap">
          <a className="mobile-btn" target="_blank" rel="noreferrer" href={mobileHref}>
            {item.buttonLabel || 'View Demo'}
          </a>
          <a className="desktop-btn" target="_blank" rel="noreferrer" href={desktopHref}>
            {item.buttonLabel || 'View Demo'}
          </a>
        </p>
      )}
      <div className="p-a-col-wrap">
        <p>{item.paragraphs}</p>
      </div>
      {item.roles?.length > 0 && (
        <div className="pa-roles-wrap">
          <h3>Roles:</h3>
          <ul>
            {item.roles.map((role) => (
              <li key={role} className={role}>{role}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default PortfolioItem; 
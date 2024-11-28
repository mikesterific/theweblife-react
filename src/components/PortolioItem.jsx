const PortfolioItem = ({
  title,
  wideScrset,
  scrset,
  img,
  alt,
  hrefMobile,
  hrefDesktop,
  buttonLabel,
  paragraphs,
  roles
}) => {
  return (
    <article className={`port-article ${title}`}>
      <h2>{title}</h2>
      <div className="p-img-wrap">
        <picture>
          <source media="(min-width: 1024px)" srcset={wideScrset} />
          <source media="(max-width: 1023px)" srcset={scrset} />
          <img src={img} loading="lazy" alt={alt} />
        </picture>
      </div>
      <p className="pa-btn-wrap">
        <a className="mobile-btn" target="_blank" href={hrefMobile}>
          {buttonLabel}
        </a>
        <a className="desktop-btn" href={hrefDesktop}>
          {buttonLabel}
        </a>
      </p>
      <div className="p-a-col-wrap">{paragraphs}</div>
      <div className="pa-roles-wrap">
        <h3>Roles:</h3>
        <ul>
          {roles.map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default PortfolioItem; 
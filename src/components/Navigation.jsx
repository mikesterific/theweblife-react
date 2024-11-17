const Navigation = () => {
  return (
    <nav className="main-nav-wrap" role="navigation" aria-labelledby="main_site_navigation">
      <h2 className="visually-hidden" id="main_site_navigation">
        Main Site Navigation
      </h2>
      <ul>
        <li className="show-mobile show-tablet nav-home-link">
          <a href="/">Home</a>
        </li>
        <li className="show-mobile show-tablet">
          <a href="#performance">Performance</a>
        </li>
        <li className="show-mobile"><a href="#author">Author</a></li>
        <li className="show-mobile"><a href="/portfolio.html">Portfolio</a></li>
        <li className="show-sm-screen"><a href="#story">My Story</a></li>
        <li className="show-mobile"><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}

export default Navigation
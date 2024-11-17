const BriefBio = () => {
  return (
    <section className="brief-bio-wrap container" id="performance">
      <p>I'm also a ...</p>
      <h2>Performance Architect</h2>
      <p className="bb-tag-line">Everybody wins when it's fast!</p>
      <p>
        I led Dell.com in an effort to speed up it's ecommerce experience. We
        wanted to measure how impactful that speed would be. So we duplicated,
        in every way, an existing page: <em>except we made it fast.</em>
      </p>
      <p>
        We were able to increase page load speed by <span>10x</span> This
        <span>increased converstion</span> almost immediately by more than
        <span>30%</span>
      </p>
      <p>
        We then converted each additional page in the purchase path with even
        greater conversion increases.
      </p>
    </section>
  )
}

export default BriefBio
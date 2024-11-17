const LargeBio = () => {
  return (
    <section className="large-bio-wrap container">
      <h2 id="story">My Story</h2>
      <div className="lb-img-wrap">
        <picture className="lazy">
          <source
            type="image/webp"
            srcSet="
              imgs/mug-200.webp 200w,
              imgs/mug-300.webp 300w,
              imgs/mug-400.webp 400w,
              imgs/mug-600.webp 600w
            "
            sizes="60vw"
          />
          <img
            src="imgs/me-2x.jpg"
            id="mug"
            alt="Mike Jones sports a fedora"
          />
        </picture>
      </div>
      <p>I've worn many hats over my career (besides the fedora)</p>
      <div className="bb-skills-wrap">
        <ul>
          <li>Performance Expert</li>
          <li>Enterprise Architect</li>
          <li>User Advocate</li>
          <li>Full-stack Designer</li>
        </ul>
      </div>
      <p>
        I started out as graphic artist working in print for many years. I
        loved the creative process and was lucky enough to start my own
        business.
      </p>
      <p>
        Then the web happened and I wanted in. However the creative control I
        had in the print medium was not to be had in HTML. This was before
        CSS.
      </p>
      <p>
        So I started a long journey to get that control back in the web
        medium. The browsers and I have had some disagreements over the years,
        but that's mostly passed these days.
      </p>
      <p>
        So 20 years later, I've had the pleasure to work with some of the
        biggest and smallest companies, as well as getting to write a book for
        Apress on HTML5 Performance. I've been very lucky.
      </p>
    </section>
  );
};

export default LargeBio;
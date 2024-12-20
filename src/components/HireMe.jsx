import EmailImg from '/imgs/email.svg';

const HireMe = () => {
  return (
    <section className="hire-me-wrap container" id="contact">
      <h2 className="wh-title">Let's Work Together</h2>
      <div className="hire-wrap copy">
        <p>
          I love this stuff so much, I often do it at night and on the weekends. 
          So please contact me if you have a challenging problem, or a good cause.
        </p>
        <div className="chat-wrap">
          <a href="mailto:mike@theweblife.com" className="btn-contact-me">
            Let's Chat
          </a>
        </div>
        <div className="social-wrap">
          <div className="sItemWrap">
          
            <a
              href="//twitter.com/Mikesterific"
              target="_blank"
              className="social-link"
              rel="noreferrer"
            >
              <span className="visually-hidden">Twitter</span>
              <svg className="logo twitter">
                <use href="#twitter" />
              </svg>
            </a>
          </div>
          <div className="sItemWrap">
             <a
              href="//www.linkedin.com/in/michaelgarrettjones"
              target="_blank"
              className="social-link"
              rel="noreferrer"
            >
              <span className="visually-hidden">LinkedIn</span>
              <svg className="logo linkedin">
                <use href="#linkedin" />
              </svg> 
             </a> 
          </div>
        </div>
      </div>
    </section>
  )
}

export default HireMe
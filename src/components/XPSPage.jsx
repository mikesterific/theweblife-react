import { useEffect } from 'react';
import '../styles/xps.css'; // You'll need to move the styles to this file

const XPSPage = () => {
  useEffect(() => {
    // Add any JavaScript initialization here
    const video = document.getElementById('video');
    if (video) {
      // Add video controls/initialization if needed
    }

    // Add lazy loading functionality
    const lazyImages = document.querySelectorAll('[pd-lazy]');
    lazyImages.forEach(img => {
      const src = img.getAttribute('pd-lazy');
      if (src) {
        img.setAttribute('src', src);
      }
    });
  }, []);

  return (
    <div className="xps-page">
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        {/* Move SVG defs here */}
      </svg>

      <div className="pd-sticky-bar">
        <div className="pd-container">
          <h5>XPS 13</h5>
          <div>
            <span>Starting at $1,199.99</span>
            <a className="black-btn" href="/ProductBuy">Buy</a>
          </div>
        </div>
      </div>

      <div className="pd-master-wrap">
        <div className="pd-hero-animation-wrap">
          {/* Hero sections */}
          <section className="pd-dark-slider" style={{ zIndex: 2 }}>
            {/* First hero section content */}
          </section>
          <section className="pd-hero-wrap pd-hero-active" style={{ zIndex: 1 }}>
            {/* Second hero section content */}
          </section>
        </div>

        <div className="pd-second-wrap">
          <div className="pd-video-wrap">
            <video id="video" width="100%" muted controls>
              <source src="https://afcs.dellcdn.com/content/media/xps_premium_anthem_page_content_0-379973220.webm" type="video/webm" />
              <source src="https://afcs.dellcdn.com/content/media/1591233626.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Masterfull section */}
          <div className="pd-masterfull-wrap" id="masterfull">
            {/* Masterfull content */}
          </div>

          {/* Stunning section */}
          <div className="pd-stunning-wrap">
            {/* Stunning content */}
          </div>

          {/* Touch section */}
          <section className="pd-touch-wrap">
            {/* Touch content */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default XPSPage; 
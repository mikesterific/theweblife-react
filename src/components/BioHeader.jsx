// Import images
import tigerCrop320 from '../images/tiger-crop-320.webp';
import tigerCrop400 from '../images/tiger-crop-400.webp';
import tigerFull300 from '../images/tiger-full-300.webp';
import tigerFull400 from '../images/tiger-full-400.webp';
import tigerFull663 from '../images/tiger-full-663.jpg';

const BioHeader = () => {
  return (
    <header className="bio-header-wrap">
      <div className="bh-text-wrap">
        <h1>
          <span>Hi, I'm</span> <span>Michael</span> <span>Garrett</span>
          <span>Jones</span>
        </h1>
        <p>Avid tiger hugger and web pro.</p>
      </div>
      <div className="bh-img-wrap">
        <picture>
          <source
            type="image/webp"
            media="(max-width: 480px)"
            srcSet={`${tigerCrop320} 320w, ${tigerCrop400} 400w`}
            sizes="100%"
          />
          <source
            type="image/webp"
            srcSet={`${tigerFull300} 300w, ${tigerFull400} 400w`}
            sizes="40vw"
          />
          <img
            src={tigerFull663}
            alt="A funny picture of Mike Jones hugging a tiger"
          />
        </picture>
      </div>
    </header>
  )
}

export default BioHeader
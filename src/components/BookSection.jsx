import bookSmallWebp from '/imgs/book-265.webp';
import bookMediumWebp from '/imgs/book-300.webp';
import bookLargeJpg from '/imgs/book-493.jpg';

const BookSection = ({ showBookDesc, setShowBookDesc }) => {
  return (
    <section className="book-wrap container" id="author">
      <h2 id="race_car">Performance Evangelist Writes a Book</h2>
      <svg className="racecar-background">
        <use xlinkHref="#racecar"></use>
      </svg>
      <div className="book-image-wrap">
        <picture className="lazy">
          <source
            type="image/webp"
            srcSet={`${bookSmallWebp} 265w, ${bookMediumWebp} 300w`}
            sizes="60vw"
          />
          <img
            src={bookLargeJpg}
            alt="Pro HTML5 Performance Book by Mike Jones & Jay Bryant"
          />
        </picture>
        <p>I co-wrote this book. Mom is very proud!</p>
      </div>
      <div className="book-expand-section">
        <button 
          className="show-book-desc"
          onClick={() => setShowBookDesc(!showBookDesc)}
        >
          Book Description
        </button>
        <div className="book-description-wrap">
          <p>
            <em>Pro HTML5 Performance</em> provides a practical guide to building extremely fast, 
            light-weight and scalable websites using fully standards compliant techniques and best practices.
          </p>
          {/* Add rest of book description */}
        </div>
      </div>
    </section>
  )
}

export default BookSection
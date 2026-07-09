import PortfolioItem from './PortfolioItem';
import portfolioData from "../data/portfolioData";

const PortfolioList = () => {
  return (
    <div className="portfolio-list">
      <h1>Portfolio</h1>
      <p>Some of the fun projects I've worked on:</p>
      {portfolioData.map((item, index) => (
        <PortfolioItem key={index} item={item} />
      ))}
    </div>
  );
};

export default PortfolioList;

import PortfolioItem from './PortfolioItem';
import portfolioData from "../data/portfolioData";

const PortfolioList = () => {
  return (
    <div className="portfolio-list">
      {portfolioData.map((item, index) => (
        <PortfolioItem key={index} item={item} />
      ))}
    </div>
  );
};

export default PortfolioList; 
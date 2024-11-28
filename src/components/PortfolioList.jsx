import PortfolioItem from '@c/PortolioItem';
import portfolioData  from '../data/portfolioData';
const PortfolioList = () => {
  return (
    <div className="portfolio-list">
      {portfolioData.map((item, index) => (
        <PortfolioItem key={index} {...item} />
      ))}
    </div>
  );
};

export default PortfolioList; 
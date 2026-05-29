import { useNavigate } from 'react-router-dom';

const PortfolioItem = ({ item }) => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    if (item.demoPath) {
      if (item.isExternalDemo) {
        window.location.href = item.demoPath;
      } else {
        navigate(item.demoPath);
      }
    }
  };

  return (
    <div className="port-item">
      <div className="port-item-wrap">
        <div className="port-item-mask">
          <div className="port-item-caption">
            <h3>{item.title}</h3>
            <p>{item.paragraphs}</p>
            <div className="port-item-links">
              {item.demoPath && (
                <button onClick={handleDemoClick} className="port-item-view">
                  {item.buttonLabel || "View Demo"}
                </button>
              )}
            </div>
          </div>
        </div>
        <img 
          src={item.img} 
          srcSet={item.srcset}
          alt={item.alt} 
        />
      </div>
    </div>
  );
};

export default PortfolioItem; 
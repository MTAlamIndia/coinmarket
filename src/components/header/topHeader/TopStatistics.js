import { Link } from "react-router-dom";

const TopStatistics = ({ text, value }) => {
  return (
    <>
      <div className="statistics">
        <span>{text}:</span>
        <Link to="/">{value}</Link>
      </div>
    </>
  );
};

export default TopStatistics;

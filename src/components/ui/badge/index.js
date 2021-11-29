import "./badge.scss";

const Badge = ({ children, classes }) => {
  return (
    <>
      <div className={`badge ${classes ? classes : null}`}>{children}</div>
    </>
  );
};

export default Badge;

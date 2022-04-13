import abcLogo from "../assets/companyLogo.svg";
import HRCLogo from "../assets/images/hrcLogo-removebg.png";
import './Header.css';

const Header = () => {
  return (
    <div className="header_main">
      <img src={abcLogo} className="logo" alt="abcLogo" />
      <h2>ABC Products</h2>
      <img src={HRCLogo} className="hrcLogo" alt="HRCLogo" />
    </div>
  );
};

export default Header;

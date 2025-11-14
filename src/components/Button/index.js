import "./styles.css";

function Button({ children, onClick, type = "button" }) {
  return (
    <button className="search-button" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
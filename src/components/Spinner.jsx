import "./Spinner.css";

function Spinner({ size = 24, text, className }) {
  return (
    <div className={`spinner ${className || ""}`} style={{ width: size, height: size }}>
      <div className="spinner-circle" />
      {text && <p className="spinner-text">{text}</p>}
    </div>
  );
}

export default Spinner;
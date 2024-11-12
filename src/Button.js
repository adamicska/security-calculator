import "./Button.css";

function Button(props) {
  const { label, handleClick } = props;
  return (
    <button
      className={`button is-fullwidth ${
        label === "=" ? "is-primary" : label === "AC" ? "is-danger" : ""
      }`}
      data-label={label}
      onClick={handleClick}
    >
      <span>{props.label}</span>
    </button>
  );
}

export default Button;

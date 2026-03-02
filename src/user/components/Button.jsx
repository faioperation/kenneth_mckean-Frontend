const Button = ({
  text,
  width,
  bg = "#fff",
  color = "#8C8C8C",
  py = "12px",
  px = "20px",
  fontName = "Montserrat",
  weight = "bold",
  fontSize = "12px",
  rounded = "full",
  border = "#8C8C8C",
}) => {
  return (
    <button
      style={{
        background: bg,
        border: border,
        color: color,
        padding: `${py} ${px}`,
        fontFamily: fontName,
        fontSize: fontSize,
        fontWeight: weight,
        borderRadius: rounded,
        cursor: "pointer",
        width: width,
      }}
    >
      {text}
    </button>
  );
};

export default Button;

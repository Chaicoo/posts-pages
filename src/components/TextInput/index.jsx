import "./style.css";

export const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="textInput"
      value={searchValue}
      onChange={handleChange}
      type="search"
      placeholder="Digite o nome da postagem"
    />
  );
};

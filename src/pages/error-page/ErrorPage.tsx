import { useNavigate } from "react-router";
import Header from "../../components/header/Header";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header></Header>
      <div>Упс, указанный URL не существует!</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Вернуться на главную
      </button>
    </>
  );
};

export default ErrorPage;

import { useQuiz } from "../contexts/QuizContext";
import Loader from "./Loader";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  if (!question) {
    return <Loader />;
  }

  return (
    <div>
      <h2>{question.question}</h2>
      <Options
        options={question.options}
        correctOption={question.correctOption}
      />
    </div>
  );
}

export default Question;

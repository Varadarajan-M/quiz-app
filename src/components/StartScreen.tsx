import { useQuiz } from '../store/QuizContext';

function StartScreen() {
	const { dispatch } = useQuiz();

	const handleStart = () => dispatch({ type: 'quiz/start' });

	return (
		<div className='app__start-screen-container'>
			<h2 className='app__start-screen-container__greeting'>
				Welcome to The React Quiz!
			</h2>
			<p className='app__start-screen-container__message'>
				15 questions to test your React mastery
			</p>
			<button
				className='app__start-screen-container__btn btn-start'
				onClick={handleStart}
			>
				Let's Start
			</button>
		</div>
	);
}

export default StartScreen;

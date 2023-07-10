import { useQuiz } from '../store/QuizContext';
import React, { useEffect, useCallback, Fragment, useMemo } from 'react';
import Options from './Options';
import config from '../config.json';
import ProgressTracker from './ProgressTracker';

const quizUrl = config.quizApi;

function Quiz() {
	const { state, dispatch } = useQuiz();

	const { questions, activeIndex, status, answer } = state;

	const activeQuestion = useMemo(
		() => questions[activeIndex],
		[questions, activeIndex],
	);

	const hasAnswered = answer !== null;

	const handleOptionClick = useCallback((userSelectedOption: number) => {
		if (hasAnswered) return;
		dispatch({
			type: 'quiz/answer',
			payload: {
				userSelectedOption,
			},
		});
	}, []);

	useEffect(() => {
		async function fetchQuestions() {
			try {
				dispatch({ type: 'quiz/loading' });

				const res = await fetch(quizUrl);
				const data = await res.json();

				dispatch({ type: 'quiz/ready', payload: data });
			} catch (error) {
				dispatch({ type: 'quiz/error' });
			}
		}

		fetchQuestions();
	}, []);

	if (status === 'Loading') {
		return <p>Loading...</p>;
	}

	if (status === 'Error') {
		return <p>Error :(</p>;
	}

	if (status === 'Ready') {
		const { question, options, correctOption } = activeQuestion;
		return (
			<Fragment>
				<ProgressTracker />
				<div className='app__quiz-container'>
					<h4 className='app__quiz-container__question'>{question}</h4>
					<Options
						options={options}
						hasAnswered={hasAnswered}
						correctOption={correctOption}
						onOptionClick={handleOptionClick}
					/>
				</div>
			</Fragment>
		);
	}
}

export default React.memo(Quiz);

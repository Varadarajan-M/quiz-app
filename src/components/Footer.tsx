import React, { useEffect, useCallback } from 'react';
import { useQuiz } from '../store/QuizContext';

const addZeroToNums = (num: number) => (num < 10 ? `0${num}` : `${num}`);

function Timer() {
	const { state, dispatch } = useQuiz();
	const { remainingTimeInSeconds } = state;

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch({ type: 'quiz/runtimer' });
		}, 1 * 1000);

		return () => clearInterval(interval);
	}, [dispatch]);

	const formatTime = useCallback((time: number): string => {
		const minutes = addZeroToNums(parseInt((time / 60).toString()));
		const seconds = addZeroToNums(parseInt((time % 60).toString()));

		return `${minutes}:${seconds}`;
	}, []);

	return (
		<span className='app__footer__timer'>
			{formatTime(remainingTimeInSeconds)}
		</span>
	);
}

function NextBtn() {
	const {
		state: { answer, questions, activeIndex },
		dispatch,
	} = useQuiz();
	const hasAnswered = answer != null;

	const isLastQuestion = activeIndex === questions.length - 1;

	const handleNext = () => {
		if (hasAnswered) dispatch({ type: 'quiz/next' });
	};
	return hasAnswered ? (
		<button className='app__footer__next-btn' onClick={handleNext}>
			{isLastQuestion ? 'Finish' : 'Next'}
		</button>
	) : null;
}

function Footer() {
	return (
		<footer className='app__footer'>
			<Timer />
			<NextBtn />
		</footer>
	);
}

export default React.memo(Footer);

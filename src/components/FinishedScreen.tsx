import React from 'react';
import { useQuiz } from '../store/QuizContext';

function FinishedScreen() {
	const { dispatch } = useQuiz();

	const handleRestart = () => dispatch({ type: 'quiz/restart' });

	return (
		<div className='app__finished-screen-container'>
			<ScoreMessage />

			<ScoreOverview />

			<button
				className='app__finished-screen-container__restart-btn'
				onClick={handleRestart}
			>
				Restart
			</button>
		</div>
	);
}

function ScoreOverview() {
	const {
		state: { currentProgress, correct, wrong },
	} = useQuiz();

	return (
		<div className='app__finished-screen-container__overview'>
			<span className='app__finished-screen-container__overview__status'>
				Questions Answered : {currentProgress} ✅
			</span>
			<span className='app__finished-screen-container__overview__status'>
				Correct : {correct} 😀
			</span>
			<span className='app__finished-screen-container__overview__status'>
				Wrong : {wrong} 😢
			</span>
		</div>
	);
}

function ScoreMessage() {
	const { state } = useQuiz();

	const { currentPoints, totalPoints } = state;

	const percentage = totalPoints > 0 ? (currentPoints / totalPoints) * 100 : 0;

	let emoji;

	if (percentage === 100) emoji = '🥇';
	if (percentage >= 80 && percentage < 100) emoji = '🎉';
	if (percentage >= 50 && percentage < 80) emoji = '🙃';
	if (percentage >= 0 && percentage < 50) emoji = '🤨';
	if (percentage === 0) emoji = '🤦‍♂️';

	return (
		<span className='app__finished-screen-container__message'>
			{emoji} You scored {currentPoints} out of {totalPoints} (
			{percentage.toFixed(2)}%)
		</span>
	);
}

export default React.memo(FinishedScreen);

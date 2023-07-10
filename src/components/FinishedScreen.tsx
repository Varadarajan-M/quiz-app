import React from 'react';
import { useQuiz } from '../store/QuizContext';

function FinishedScreen() {
	const { state, dispatch } = useQuiz();

	const { currentPoints, totalPoints } = state;

	const percentage = totalPoints > 0 ? (currentPoints / totalPoints) * 100 : 0;

	let emoji;

	if (percentage === 100) emoji = '🥇';
	if (percentage >= 80 && percentage < 100) emoji = '🎉';
	if (percentage >= 50 && percentage < 80) emoji = '🙃';
	if (percentage >= 0 && percentage < 50) emoji = '🤨';
	if (percentage === 0) emoji = '🤦‍♂️';

	const handleRestart = () => dispatch({ type: 'quiz/restart' });

	return (
		<div className='app__finished-screen-container'>
			<span className='app__finished-screen-container__message'>
				{emoji} You scored {currentPoints} out of {totalPoints} (
				{percentage.toFixed(2)}%)
			</span>
			<span className='app__finished-screen-container__highscore'>
				(Highscore: {currentPoints} points)
			</span>

			<button
				className='app__finished-screen-container__restart-btn'
				onClick={handleRestart}
			>
				Restart
			</button>
		</div>
	);
}

export default React.memo(FinishedScreen);

import React, { useEffect, useMemo } from 'react';
import { useQuiz } from '../store/QuizContext';

function ProgressTracker() {
	const { state, dispatch } = useQuiz();
	const {
		questions,
		activeIndex,
		currentProgress,
		currentPoints,
		totalPoints,
	} = state;

	const totalQuestions = useMemo(() => questions.length, [questions]);

	useEffect(() => {
		dispatch({ type: 'quiz/updatehighscore' });
	}, [currentPoints]);

	return (
		<div className='app__progress-container'>
			<progress max={totalQuestions} value={currentProgress} />
			<span className='app__progress-container__question-no'>
				Question <strong>{activeIndex + 1}</strong>/{totalQuestions}
			</span>
			<span className='app__progress-container__current-points'>
				<strong>{currentPoints}</strong>/{totalPoints}
			</span>
		</div>
	);
}

export default React.memo(ProgressTracker);

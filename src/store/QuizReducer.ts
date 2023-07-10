import config from '../config.json';

enum AppState {
	Loading = 'Loading',
	Ready = 'Ready',
	Error = 'Error',
	Start = 'Start',
	Initial = 'Initial',
	Finished = 'Finished',
}
type Question = {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
};

export interface State {
	status: keyof typeof AppState;
	questions: Question[];
	activeIndex: number;
	currentPoints: number;
	answer: number | null;
	currentProgress: number;
	totalPoints: number;
	remainingTimeInSeconds: number;
	highScore: number;
}

export const initialState: State = {
	status: 'Initial',
	questions: [],
	activeIndex: 0,
	answer: null,
	currentPoints: 0,
	currentProgress: 0,
	totalPoints: 0,
	remainingTimeInSeconds: config.maxTimeInSeconds,
	highScore: 0,
};

export function reducer(state: State = initialState, action: any): State {
	switch (action.type) {
		case 'quiz/start':
			return {
				...state,
				status: 'Start',
			};

		case 'quiz/loading':
			return {
				...state,
				status: 'Loading',
			};

		case 'quiz/ready':
			const totalPoints = action.payload.reduce(
				(sum: number, curr: Question) => sum + curr['points'],
				0,
			);

			return {
				...state,
				status: 'Ready',
				questions: action.payload,
				activeIndex: 0,
				totalPoints,
			};

		case 'quiz/error':
			return {
				...state,
				status: 'Error',
			};

		case 'quiz/answer':
			const { userSelectedOption } = action.payload;
			const { questions, activeIndex, currentProgress } = state;
			const currentQuestion = questions[activeIndex];

			const isCorrect = currentQuestion.correctOption === userSelectedOption;

			const points = isCorrect
				? state.currentPoints + currentQuestion.points
				: state.currentPoints;

			return {
				...state,
				answer: userSelectedOption,
				currentPoints: points,
				currentProgress: currentProgress + 1,
			};

		case 'quiz/next':
			if (state.activeIndex === state.questions.length - 1)
				return {
					...state,
					answer: null,
					status: 'Finished',
				};
			return {
				...state,
				answer: null,
				activeIndex: state.activeIndex + 1,
			};

		case 'quiz/runtimer':
			const { remainingTimeInSeconds } = state;
			const time =
				remainingTimeInSeconds > 0
					? remainingTimeInSeconds - 1
					: remainingTimeInSeconds;
			const status: keyof typeof AppState =
				remainingTimeInSeconds > 0 ? state.status : 'Finished';

			return {
				...state,
				status,
				remainingTimeInSeconds: time,
			};

		case 'quiz/restart':
			return {
				...initialState,
				highScore: state.highScore,
				status: 'Start',
			};

		case 'quiz/updatehighscore':
			return {
				...state,
				highScore:
					state.highScore > state.currentPoints
						? state.highScore
						: state.currentPoints,
			};

		default:
			return state;
	}
}

import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { initialState, reducer, State } from './QuizReducer';

interface ContextProps {
	state: State;
	dispatch: Dispatch<unknown>;
}

const QuizContext = createContext<ContextProps>({
	state: initialState,
	dispatch: () => {},
});

type QuizContextProviderProps = {
	children: React.ReactElement;
};

const QuizContextProvider: React.FC<QuizContextProviderProps> = ({
	children,
}: QuizContextProviderProps) => {
	const [state, dispatch] = useReducer<React.Reducer<State, unknown>>(
		reducer,
		initialState,
	);

	return (
		<QuizContext.Provider value={{ state, dispatch }}>
			{children}
		</QuizContext.Provider>
	);
};

export const useQuiz = () => useContext(QuizContext);

export default QuizContextProvider;

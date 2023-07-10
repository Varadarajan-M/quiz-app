import {
	FinishedScreen,
	Footer,
	Header,
	Quiz,
	StartScreen,
} from './components';
import './global.scss';
import { Fragment } from 'react';
import { useQuiz } from './store/QuizContext';

function App() {
	const {
		state: { status },
	} = useQuiz();

	return (
		<div className='app'>
			<Header />
			<Fragment>
				{status === 'Initial' && <StartScreen />}

				{status !== 'Initial' && status !== 'Finished' && <Quiz />}

				{status === 'Finished' && <FinishedScreen />}
			</Fragment>
			{status === 'Ready' && <Footer />}
		</div>
	);
}

export default App;

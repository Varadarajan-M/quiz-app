import ReactDOM from 'react-dom/client';
import QuizContextProvider from './store/QuizContext.tsx';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<QuizContextProvider>
		<App />
	</QuizContextProvider>,
);

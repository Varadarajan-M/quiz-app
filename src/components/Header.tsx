import logo from '../assets/quiz-logo.svg';
import React from 'react';
import config from '../config.json';
function Header() {
	return (
		<header className='app__header'>
			<img src={logo} alt='Quiz-logo' className='app__header__react-logo' />
			<h1 className='app__header__title'>{config.quizTitle}</h1>
		</header>
	);
}

export default React.memo(Header);

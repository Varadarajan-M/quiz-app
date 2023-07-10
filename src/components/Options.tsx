import React from 'react';

type OptionProps = {
	hasAnswered: boolean;
	bgColor: string;
	onOptionClick: () => void;
	option: string;
};

function Option({ hasAnswered, bgColor, onOptionClick, option }: OptionProps) {
	return (
		<button
			disabled={hasAnswered}
			className='app__quiz-container__option'
			style={{
				backgroundColor: bgColor,
			}}
			onClick={onOptionClick}
		>
			{option}
		</button>
	);
}

type OptionsProps = {
	options: string[];
	hasAnswered: boolean;
	correctOption: number;
	onOptionClick: (optionIndex: number) => void;
};

function Options({
	options,
	hasAnswered,
	correctOption,
	onOptionClick,
}: OptionsProps) {
	const getOptionBgColor = (index: number) => {
		return hasAnswered ? (correctOption === index ? '#6e6e6e' : '#ab2626') : '';
	};

	return (
		<>
			{options.map((option: string, index: number) => (
				<Option
					key={option}
					option={option}
					onOptionClick={() => onOptionClick(index)}
					hasAnswered={hasAnswered}
					bgColor={getOptionBgColor(index)}
				/>
			))}
		</>
	);
}

export default React.memo(Options);

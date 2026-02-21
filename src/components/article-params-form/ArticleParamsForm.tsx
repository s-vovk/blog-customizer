import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	backgroundColors,
} from 'src/constants/articleProps';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type Props = {
	articleState: ArticleStateType;
	onChangeState: (newArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, onChangeState }: Props) => {
	const ref = useRef<HTMLFormElement>(null);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const onDocumentMouseDown = (e: MouseEvent) => {
			if (isOpen && !ref.current?.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', onDocumentMouseDown);
		}

		return () => {
			document.removeEventListener('mousedown', onDocumentMouseDown);
		};
	}, [isOpen]);

	const onFontFamilyOption = (selectedFontFamilyOption: OptionType) => {
		setFormState({ ...formState, fontFamilyOption: selectedFontFamilyOption });
	};

	const onFontSizeOption = (selectedFontSizeOption: OptionType) => {
		setFormState({ ...formState, fontSizeOption: selectedFontSizeOption });
	};

	const onFontColor = (selectedFontColor: OptionType) => {
		setFormState({ ...formState, fontColor: selectedFontColor });
	};

	const onBackgroundColor = (selectedBackgroundColor: OptionType) => {
		setFormState({
			...formState,
			backgroundColor: selectedBackgroundColor,
		});
	};

	const onContentWidth = (selectedContentWidth: OptionType) => {
		setFormState({ ...formState, contentWidth: selectedContentWidth });
	};

	const onReset = () => {
		setFormState(defaultArticleState);
		onChangeState(defaultArticleState);
	};

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onChangeState(formState);
	};

	const onArrowButton = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowButton} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={onSubmit}
					onReset={onReset}
					ref={ref}>
					<Select
						selected={formState.fontFamilyOption}
						onChange={onFontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={onFontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						onChange={onFontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={onBackgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={onContentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

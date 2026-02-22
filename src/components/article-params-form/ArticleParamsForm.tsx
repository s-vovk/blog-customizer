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
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useFormClose } from './ArticleParamsForm.hooks';

type Props = {
	articleState: ArticleStateType;
	onChangeState: (newArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ articleState, onChangeState }: Props) => {
	const [formState, setFormState] = useState<ArticleStateType>(articleState);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const { formRef } = useFormClose({ isFormOpen, setIsFormOpen });

	const onOptionChange = (name: string) => (option: OptionType) => {
		setFormState({ ...formState, [name]: option });
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
		setIsFormOpen(!isFormOpen);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={onArrowButton} />
			<aside
				className={clsx(styles.container, isFormOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={onSubmit}
					onReset={onReset}
					ref={formRef}>
					<Select
						selected={formState.fontFamilyOption}
						onChange={onOptionChange('fontFamilyOption')}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={onOptionChange('fontSizeOption')}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						onChange={onOptionChange('fontColor')}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={onOptionChange('backgroundColor')}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={onOptionChange('contentWidth')}
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

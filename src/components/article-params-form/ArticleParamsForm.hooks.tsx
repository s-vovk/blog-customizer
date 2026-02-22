import { useEffect, useRef } from 'react';

type Props = {
	isFormOpen: boolean;
	setIsFormOpen: (v: boolean) => void;
};

export const useFormClose = ({ isFormOpen, setIsFormOpen }: Props) => {
	const formRef = useRef<HTMLFormElement>(null);

	useEffect(() => {
		const onDocumentMouseDown = (e: MouseEvent) => {
			if (isFormOpen && !formRef.current?.contains(e.target as Node)) {
				setIsFormOpen(false);
			}
		};

		const onDocumentKeyDown = (e: KeyboardEvent) => {
			if (isFormOpen && e.key === 'Escape') {
				setIsFormOpen(false);
			}
		};

		if (isFormOpen) {
			document.addEventListener('mousedown', onDocumentMouseDown);
			document.addEventListener('keydown', onDocumentKeyDown);
		}

		return () => {
			document.removeEventListener('mousedown', onDocumentMouseDown);
			document.removeEventListener('keydown', onDocumentKeyDown);
		};
	}, [isFormOpen]);

	return {
		formRef,
	};
};

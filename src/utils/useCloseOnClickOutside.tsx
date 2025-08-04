import { useEffect } from 'react'

type useCloseOnClickOutsideProps<T extends HTMLElement> = {
	ref: React.RefObject<T | null>
	onCloseAction: () => void
}

export function useCloseOnClickOutside<T extends HTMLElement>({ ref, onCloseAction }: useCloseOnClickOutsideProps<T>) {
	useEffect(() => {
		console.log('ref.current', ref.current)

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onCloseAction()
			}
		}

		const handleClickOutside = (event: MouseEvent | FocusEvent) => {
			console.log('CLICK')
			console.log('clicked target:', event.target)
			console.log('inside?', ref.current?.contains(event.target as Node))

			if (ref.current && !ref.current.contains(event.target as Node)) {
				onCloseAction()
			}
		}

		const listeners = [
			{ target: window, type: 'keydown', handler: handleEscape },
			{ target: document, type: 'pointerdown', handler: handleClickOutside },
			{ target: document, type: 'focusin', handler: handleClickOutside },
		]

		listeners.forEach(({ target, type, handler }) => target.addEventListener(type, handler as EventListener))

		return () => {
			listeners.forEach(({ target, type, handler }) => target.removeEventListener(type, handler as EventListener))
		}
	}, [ref, onCloseAction])
}

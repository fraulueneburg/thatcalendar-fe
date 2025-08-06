import type { Modifier } from '@dnd-kit/core'

type GridUnit = number | `${number}%`

export function createCustomSnapModifier(gridSizeX: GridUnit, gridSizeY: GridUnit): Modifier {
	return ({ transform }) => ({
		...transform,
		x: Math.ceil(transform.x / gridSizeX) * gridSizeX,
		y: Math.ceil(transform.y / gridSizeY) * gridSizeY,
	})
}

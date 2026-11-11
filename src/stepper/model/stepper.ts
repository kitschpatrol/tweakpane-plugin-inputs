import type { PointNdAssembly } from '@tweakpane/core'

export type StepperObject = {
	val: number
}

export class Stepper {
	public val: number

	constructor(value: number) {
		this.val = value
	}

	public static equals(v1: Stepper, v2: Stepper): boolean {
		return v1.val === v2.val
	}

	public static isObject(object: unknown): object is StepperObject {
		if (typeof object !== 'object' || object === null) {
			return false
		}

		const { val } = object as Record<string, unknown>
		return typeof val === 'number'
	}

	public toObject(): StepperObject {
		return {
			val: this.val,
		}
	}
}

export const StepperAssembly: PointNdAssembly<number> = {
	fromComponents: (comps) => comps[0] ?? 0,
	toComponents: (p) => [p],
}

import type { Constraint } from '@tweakpane/core'

export class StepperConstraint implements Constraint<number> {
	public readonly edge: Constraint<number> | undefined
	public readonly step: number

	constructor(step: number, edge?: Constraint<number>) {
		this.step = step
		this.edge = edge
	}

	constrain(value: number): number {
		return this.edge?.constrain(value) ?? value
	}
}

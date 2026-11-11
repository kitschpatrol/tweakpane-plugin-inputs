import type { Value, ValueController, ViewProps } from '@tweakpane/core'
import type { StepperConstraint } from '../constraint/stepper'
import { StepperButtonsView } from '../view/stepper-buttons'

type Config = {
	constraint: StepperConstraint | undefined
	value: Value<number>
	viewProps: ViewProps
}

export class StepperButtonsController implements ValueController<number, StepperButtonsView> {
	public readonly step: number
	public readonly value: Value<number>
	public readonly view: StepperButtonsView
	public readonly viewProps: ViewProps

	constructor(doc: Document, config: Config) {
		this.value = config.value
		this.viewProps = config.viewProps
		this.step = config.constraint ? config.constraint.step : 1
		this.view = new StepperButtonsView(doc, {
			value: this.value,
			viewProps: config.viewProps,
		})

		this.view.btnMinus.addEventListener('click', () => {
			this.value.setRawValue(this.value.rawValue - this.step, {
				forceEmit: true,
				last: true,
			})
		})

		this.view.btnPlus.addEventListener('click', () => {
			this.value.setRawValue(this.value.rawValue + this.step, {
				forceEmit: true,
				last: true,
			})
		})
	}
}

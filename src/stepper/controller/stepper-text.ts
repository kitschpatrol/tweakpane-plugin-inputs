import type { NumberTextProps, Parser, Value, ValueController, ViewProps } from '@tweakpane/core'
import { PointNdTextController } from '@tweakpane/core'
import type { StepperConstraint } from '../constraint/stepper'
import { StepperAssembly } from '../model/stepper'
import { StepperTextView } from '../view/stepper-text'
import { StepperButtonsController } from './stepper-buttons'

type Config = {
	constraint: StepperConstraint
	parser: Parser<number>
	textProps: NumberTextProps
	value: Value<number>
	viewProps: ViewProps
}

export class StepperTextController implements ValueController<number, StepperTextView> {
	public readonly value: Value<number>
	public readonly view: StepperTextView
	public readonly viewProps: ViewProps
	public get textController(): PointNdTextController<number> {
		return this.tc_
	}
	private readonly sc_: StepperButtonsController

	private readonly tc_: PointNdTextController<number>

	constructor(doc: Document, config: Config) {
		this.value = config.value
		this.viewProps = config.viewProps
		this.sc_ = new StepperButtonsController(doc, config)

		const axis = {
			constraint: config.constraint.edge,
			textProps: config.textProps,
		}

		this.tc_ = new PointNdTextController<number>(doc, {
			assembly: StepperAssembly,
			axes: [axis],
			parser: config.parser,
			value: this.value,
			viewProps: config.viewProps,
		})

		this.view = new StepperTextView(doc, {
			buttonsView: this.sc_.view,
			textView: this.tc_.view,
		})
	}
}

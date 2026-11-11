import type { PointNdTextController, View } from '@tweakpane/core'
import { ClassName } from '@tweakpane/core'
import type { StepperButtonsView } from './stepper-buttons'

type Config = {
	buttonsView: StepperButtonsView
	textView: PointNdTextController<number>['view']
}

const className = ClassName('step')

export class StepperTextView implements View {
	public readonly element: HTMLElement
	private readonly buttonsView_: StepperButtonsView
	private readonly textView_: PointNdTextController<InputEvent>['view']

	constructor(doc: Document, config: Config) {
		this.buttonsView_ = config.buttonsView
		this.textView_ = config.textView

		this.element = doc.createElement('div')
		this.element.classList.add(className())

		const buttonsElement = doc.createElement('div')
		buttonsElement.classList.add(className('s'))
		buttonsElement.append(this.buttonsView_.element)
		this.element.append(buttonsElement)

		const textElement = doc.createElement('div')
		textElement.classList.add(className('t'))
		textElement.append(this.textView_.element)
		this.element.append(textElement)
	}
}

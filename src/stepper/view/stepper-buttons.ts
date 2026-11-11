import type { Value, View, ViewProps } from '@tweakpane/core'
import { ClassName } from '@tweakpane/core'

type Config = {
	value: Value<number>
	viewProps: ViewProps
}

const className = ClassName('step')

export class StepperButtonsView implements View {
	public readonly btnMinus: HTMLElement
	public readonly btnPlus: HTMLElement
	public readonly element: HTMLElement

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div')
		this.element.classList.add(className())
		config.viewProps.bindClassModifiers(this.element)

		const buttonMinus = doc.createElement('button')
		buttonMinus.textContent = '-'
		buttonMinus.classList.add(className('b'))
		config.viewProps.bindDisabled(buttonMinus)
		this.element.append(buttonMinus)
		this.btnMinus = buttonMinus

		const buttonPlus = doc.createElement('button')
		buttonPlus.textContent = '+'
		buttonPlus.classList.add(className('b'))
		config.viewProps.bindDisabled(buttonPlus)
		this.element.append(buttonPlus)
		this.btnPlus = buttonPlus
	}
}

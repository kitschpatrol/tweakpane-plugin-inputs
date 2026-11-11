import type { BindingApi } from '@tweakpane/core'
import { BindingTarget } from '@tweakpane/core'
import { Pane } from 'tweakpane'
import { afterEach, describe, expect, it } from 'vitest'
import type { StepperInputParams } from '../src/index'
import * as plugin from '../src/index'
import { StepperConstraint } from '../src/stepper/constraint/stepper'
import { StepperInputPlugin } from '../src/stepper/plugin'

type Change = { last: boolean; value: number }

/** Record the change events a binding emits. */
function recordChanges(binding: BindingApi<unknown, number>): Change[] {
	const changes: Change[] = []
	binding.on('change', (event) => {
		changes.push({ last: event.last, value: event.value })
	})
	return changes
}

/**
 * Read the step the plugin's constraint gives the increment and decrement
 * buttons.
 */
function getButtonStep(step: number | undefined): number {
	const params: StepperInputParams =
		step === undefined ? { view: 'stepper' } : { step, view: 'stepper' }
	const constraint = StepperInputPlugin.binding.constraint?.({
		initialValue: 0,
		params,
		target: new BindingTarget({ value: 0 }, 'value'),
	})
	if (!(constraint instanceof StepperConstraint)) {
		throw new TypeError('The stepper constraint was not created')
	}

	return constraint.step
}

describe('stepper plugin', () => {
	let pane: Pane | undefined

	afterEach(() => {
		pane?.dispose()
		pane = undefined
	})

	function setup(options: Record<string, unknown> = {}) {
		pane = new Pane()
		pane.registerPlugin(plugin)
		const params = { value: 10 }
		const binding = pane.addBinding(params, 'value', { ...options, view: 'stepper' })
		const [minus, plus] = binding.element.querySelectorAll('button')
		const input = binding.element.querySelector('input')
		if (!minus || !plus || !input) {
			throw new Error('The stepper controls were not created')
		}

		return { binding, input, minus, pane, params, plus }
	}

	it('accepts only numbers with the stepper view and valid parameters', () => {
		expect(StepperInputPlugin.accept(10, { view: 'stepper' })?.initialValue).toBe(10)
		expect(
			StepperInputPlugin.accept(10, { max: 20, min: 0, step: 2, view: 'stepper' })?.params,
		).toMatchObject({ max: 20, min: 0, step: 2 })
		expect(StepperInputPlugin.accept('10', { view: 'stepper' })).toBeNull()
		expect(StepperInputPlugin.accept(10, {})).toBeNull()
		expect(StepperInputPlugin.accept(10, { view: 'slider' })).toBeNull()
		expect(StepperInputPlugin.accept(10, { step: '1', view: 'stepper' })).toBeNull()
		expect(StepperInputPlugin.accept(10, { max: '20', view: 'stepper' })).toBeNull()
	})

	it('registers the bundle and installs its compiled styles', () => {
		const { minus, plus } = setup()
		expect(minus.textContent).toBe('-')
		expect(plus.textContent).toBe('+')
		expect(plugin.css).toContain('.tp-stepv')
		expect(plugin.css).not.toContain('@use')
		expect(document.head.textContent).toContain('.tp-stepv')
	})

	it('increments and decrements by one without a step', () => {
		const { binding, minus, params, plus } = setup()
		const changes = recordChanges(binding)
		plus.click()
		expect(params.value).toBe(11)
		minus.click()
		minus.click()
		expect(params.value).toBe(9)
		expect(changes).toEqual([
			{ last: true, value: 11 },
			{ last: true, value: 10 },
			{ last: true, value: 9 },
		])
	})

	it('increments and decrements by the step within min and max', () => {
		const { minus, params, plus } = setup({ max: 14, min: 6, step: 2 })
		plus.click()
		expect(params.value).toBe(12)
		plus.click()
		plus.click()
		expect(params.value).toBe(14)
		for (let i = 0; i < 6; i++) {
			minus.click()
		}

		expect(params.value).toBe(6)
	})

	it.each([
		[-2, 8],
		[0.5, 10.5],
	])('applies a step of %s to the plus button', (step, expected) => {
		const { params, plus } = setup({ step })
		plus.click()
		expect(params.value).toBe(expected)
	})

	it.each([
		{ expected: 1, step: undefined },
		{ expected: 1, step: 0 },
		{ expected: 1, step: -0 },
		{ expected: 1, step: NaN },
		{ expected: 2, step: 2 },
		{ expected: -2, step: -2 },
		{ expected: 0.5, step: 0.5 },
	])('uses a button step of $expected for a step of $step', ({ expected, step }) => {
		expect(getButtonStep(step)).toBe(expected)
	})

	it('writes values entered in the text input within min and max', () => {
		const { binding, input, params } = setup({ min: 0, max: 50 })
		const changes = recordChanges(binding)
		input.value = '42'
		input.dispatchEvent(new Event('change', { bubbles: true }))
		expect(params.value).toBe(42)
		expect(changes).toEqual([{ last: true, value: 42 }])
		input.value = '100'
		input.dispatchEvent(new Event('change', { bubbles: true }))
		expect(params.value).toBe(50)
	})

	it('shows external changes after refresh', () => {
		const { binding, input, params } = setup()
		params.value = 25
		binding.refresh()
		expect(Number(input.value)).toBe(25)
	})

	it('inherits the pane disabled state', () => {
		const { input, minus, pane: currentPane, params, plus } = setup()
		currentPane.disabled = true
		expect(input.disabled).toBe(true)
		expect(minus.disabled).toBe(true)
		expect(plus.disabled).toBe(true)
		plus.click()
		expect(params.value).toBe(10)
		currentPane.disabled = false
		expect(plus.disabled).toBe(false)
		plus.click()
		expect(params.value).toBe(11)
	})

	it('removes its elements when disposed', () => {
		const { binding, pane: currentPane, plus } = setup()
		binding.dispose()
		expect(binding.element.isConnected).toBe(false)
		expect(plus.isConnected).toBe(false)
		expect(currentPane.children).not.toContain(binding)
	})
})

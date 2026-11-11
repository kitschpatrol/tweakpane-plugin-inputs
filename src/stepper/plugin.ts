import type {
	BaseInputParams,
	BindingTarget,
	InputBindingPlugin,
	NumberInputParams,
} from '@tweakpane/core'
import {
	CompositeConstraint,
	createNumberTextInputParamsParser,
	createNumberTextPropsObject,
	createPlugin,
	createRangeConstraint,
	createStepConstraint,
	parseNumber,
	parseRecord,
	TpError,
	ValueMap,
} from '@tweakpane/core'
import { StepperConstraint } from './constraint/stepper'
import { StepperTextController } from './controller/stepper-text'

export type StepperInputParams = BaseInputParams &
	NumberInputParams & {
		view: 'stepper'
	}

/** Fall back to a button step of 1 for a missing, zero, or NaN step. */
function getButtonStep(step: number | undefined): number {
	return step === undefined || step === 0 || Number.isNaN(step) ? 1 : step
}

/** Convert an external unknown value into the internal value. */
function readNumber(exValue: unknown): number {
	return typeof exValue === 'number' ? exValue : 0
}

/** Write the primitive value to the binding target. */
function writeNumber(target: BindingTarget, inValue: number): void {
	target.write(inValue)
}

// NOTE: JSDoc comments of `InputBindingPlugin` can be useful to know details about each property
// `InputBindingPlugin<In, Ex, P>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
// - P is the type of the parsed parameters
export const StepperInputPlugin: InputBindingPlugin<number, number, StepperInputParams> =
	createPlugin({
		accept(exValue, params) {
			if (typeof exValue !== 'number') {
				return null
			}

			const result = parseRecord<StepperInputParams>(params, (p) => ({
				// Addresses https://github.com/kitschpatrol/svelte-tweakpane-ui/issues/24
				...createNumberTextInputParamsParser(p),
				// `view` option may be useful to provide a custom control for primitive values
				view: p.required.constant('stepper'),
			}))

			// Return a typed value and params to accept the user input
			return result
				? {
						initialValue: exValue,
						params: result,
					}
				: null
		},
		binding: {
			constraint(args) {
				const constraints = []
				const cr = createRangeConstraint(args.params)
				if (cr) {
					constraints.push(cr)
				}

				const cs = createStepConstraint(args.params)
				if (cs) {
					constraints.push(cs)
				}

				return new StepperConstraint(
					getButtonStep(args.params.step),
					new CompositeConstraint(constraints),
				)
			},
			reader: (_args) => readNumber,
			writer: (_args) => writeNumber,
		},
		controller(args) {
			const v = args.value
			const c = args.constraint
			if (!(c instanceof StepperConstraint)) {
				throw TpError.shouldNeverHappen()
			}

			const textProps = ValueMap.fromObject(createNumberTextPropsObject(args.params, v.rawValue))

			return new StepperTextController(args.document, {
				constraint: c,
				parser: parseNumber,
				textProps,
				value: v,
				viewProps: args.viewProps,
			})
		},
		id: 'input-stepper',
		type: 'input',
	})

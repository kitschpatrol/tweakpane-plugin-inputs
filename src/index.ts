import type { TpPlugin } from '@tweakpane/core'
import { StepperInputPlugin } from './stepper/plugin'
import pluginCss from './styles/plugin.scss?inline'

export const id = 'inputs'
export const css: string = pluginCss
export const plugins: TpPlugin[] = [StepperInputPlugin]

export * from './stepper/controller/stepper-buttons'
export * from './stepper/controller/stepper-text'
export * from './stepper/model/stepper'
export type { StepperInputParams } from './stepper/plugin'
export * from './stepper/view/stepper-buttons'
export * from './stepper/view/stepper-text'

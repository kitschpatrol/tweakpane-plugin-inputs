import { Value, ValueController, ViewProps } from "@tweakpane/core";

import { StepperConstraint } from "../constraint/stepper.js";
import { StepperButtonsView } from "../view/stepper-buttons.js";

interface Config {
  value: Value<number>;
  viewProps: ViewProps;
  constraint: StepperConstraint | undefined;
}

export class StepperButtonsController
  implements ValueController<number, StepperButtonsView>
{
  public readonly value: Value<number>;
  public readonly view: StepperButtonsView;
  public readonly viewProps: ViewProps;
  public readonly step: number;

  constructor(doc: Document, config: Config) {
    this.value = config.value;
    this.viewProps = config.viewProps;
    this.step = config.constraint ? config.constraint.step : 1;
    this.view = new StepperButtonsView(doc, {
      value: this.value,
      viewProps: config.viewProps,
    });

    this.view.btnMinus.addEventListener("click", () => {
      const v = this.value.rawValue ?? 0;
      this.value.setRawValue(v - this.step, {
        forceEmit: true,
        last: true,
      });
    });

    this.view.btnPlus.addEventListener("click", () => {
      const v = this.value.rawValue ?? 0;
      this.value.setRawValue(v + this.step, {
        forceEmit: true,
        last: true,
      });
    });
  }
}

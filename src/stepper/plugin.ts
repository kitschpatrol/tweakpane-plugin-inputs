import {
  BaseInputParams,
  BindingTarget,
  CompositeConstraint,
  createNumberTextInputParamsParser,
  createNumberTextPropsObject,
  createPlugin,
  createRangeConstraint,
  createStepConstraint,
  InputBindingPlugin,
  NumberInputParams,
  parseNumber,
  parseRecord,
  TpError,
  ValueMap,
} from "@tweakpane/core";

import { StepperConstraint } from "./constraint/stepper.js";
import { StepperTextController } from "./controller/stepper-text.js";

export interface StepperInputParams extends NumberInputParams, BaseInputParams {
  view: "stepper";
}

// NOTE: JSDoc comments of `InputBindingPlugin` can be useful to know details about each property
// `InputBindingPlugin<In, Ex, P>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
// - P is the type of the parsed parameters
export const StepperInputPlugin: InputBindingPlugin<
  number,
  number,
  StepperInputParams
> = createPlugin({
  id: "input-stepper",
  type: "input",

  accept: (exValue, params) => {
    if (typeof exValue !== "number") {
      return null;
    }

    const result = parseRecord<StepperInputParams>(params, (p) => ({
      // Addresses https://github.com/kitschpatrol/svelte-tweakpane-ui/issues/24
      ...createNumberTextInputParamsParser(p),
      // `view` option may be useful to provide a custom control for primitive values
      view: p.required.constant("stepper"),
    }));

    // Return a typed value and params to accept the user input
    return result
      ? {
          initialValue: exValue,
          params: result,
        }
      : null;
  },
  binding: {
    //reader: (_args) => stepperFromUnknown,
    //writer: (_args) => writeStepper,

    reader(_args) {
      return (exValue: unknown): number => {
        // Convert an external unknown value into the internal value
        return typeof exValue === "number" ? exValue : 0;
      };
    },

    writer(_args) {
      return (target: BindingTarget, inValue: number) => {
        // Use `target.write()` to write the primitive value to the target,
        // or `target.writeProperty()` to write a property of the target
        target.write(inValue);
      };
    },

    constraint(args) {
      const constraints = [];
      const cr = createRangeConstraint(args.params);
      if (cr) {
        constraints.push(cr);
      }
      const cs = createStepConstraint(args.params);
      if (cs) {
        constraints.push(cs);
      }
      return new StepperConstraint(
        args.params.step ? args.params.step : 1,
        new CompositeConstraint(constraints),
      );
    },
  },
  controller(args) {
    const v = args.value;
    const c = args.constraint;
    if (!(c instanceof StepperConstraint)) {
      throw TpError.shouldNeverHappen();
    }

    const textProps = ValueMap.fromObject(
      createNumberTextPropsObject(args.params, v.rawValue),
    );

    return new StepperTextController(args.document, {
      constraint: c,
      parser: parseNumber,
      textProps: textProps,
      value: v,
      viewProps: args.viewProps,
    });
  },
});

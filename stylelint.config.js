import { stylelintConfig } from '@kitschpatrol/stylelint-config'

export default stylelintConfig({
	overrides: [
		{
			extends: ['stylelint-config-standard-scss'],
			files: ['**/*.scss'],
			rules: {
				// The stepper resets the unconditional :hover background of core's %tp-input; a (hover: hover) query would leave it on touch devices.
				'defensive-css/no-accidental-hover': null,
			},
		},
	],
})

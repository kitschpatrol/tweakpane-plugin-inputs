# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Maintenance

- Update the development package manager to pnpm 12.16.1.
- Update the GitHub release and changelog-generation actions.
- Switch npm publishing authentication to a one-time password retrieved from 1Password.

## [1.0.4-fork.1] - 2026-10-15

### Documentation

- Document the `-fork.N` release suffix in place of beta versioning.
- Refresh README links and badges and clarify MIT attribution for the original plugin and fork modifications.

### Maintenance

- Refresh development dependencies, including pnpm 12, ESLint 10, and TypeScript 6, and declare Node.js `^24.16.0 || >=26.3.0` for development.
- Simplify build, formatting, cleanup, and watch scripts using pnpm's script runner, shx, and Rollup watch mode.
- Migrate to Sass's modern compilation API and rebuild embedded CSS when watched stylesheets change, preserving recovery after Sass errors.
- Generate README metadata with mdat and validate it as part of the test command.
- Add automated repository and website link checks and a scheduled Fork Tender workflow.
- Refresh release and metadata workflows with pinned actions and default-branch tag validation; run tests and builds before versioning and publishing fork releases.

## [1.0.4-beta.5] - 2025-05-26

### Fixed

- Honor standard Tweakpane numeric text-input parameters, including custom `format` callbacks, when parsing Stepper bindings.

### Maintenance

- Refresh development dependencies for building, linting, formatting, and releasing, and update pnpm to 10.11.0.

## [1.0.4-beta.4] - 2025-03-04

### Changed

- Remove the pnpm engine requirement from the published package.

### Maintenance

- Update the runtime `@tweakpane/core` requirement to `^2.0.5`.
- Refresh build, lint, formatting, and release dependencies, update pnpm to 10.5.2, and explicitly allow the `@parcel/watcher` installation build.
- Correct the repository URL in package metadata.
- Publish npm releases with the `latest` tag and update the GitHub release and repository-metadata workflows.

## [1.0.4-beta.3] - 2024-10-22

### Changed

- Expand the Stepper text field to fill the available space beside its buttons.

## [1.0.4-beta.2] - 2024-10-22

### Added

- Export the `StepperInputParams` interface from the Stepper plugin module for TypeScript consumers.

## [1.0.4-beta.1] - 2024-10-22

### Added

- Add numeric Stepper bindings (`view: 'stepper'`) with decrement/increment buttons, text and drag editing, numeric change events, optional `min`/`max` bounds, and fractional `step` values defaulting to 1.
- Expose plugin registration exports, Stepper controller and view classes, and the `Stepper`, `StepperObject`, and `StepperAssembly` APIs.
- Distribute ESM and minified bundles with TypeScript declarations for Tweakpane 4, declare Node.js 18+ and pnpm 9+ requirements, and externalize `@tweakpane/core` as a runtime dependency.

### Documentation

- Document dependency externalization, bundler and browser import-map usage, and fork versioning; provide a browser example of Stepper registration, fractional steps, bounds, and change events.

### Maintenance

- Establish pnpm-based builds, linting, formatting, and release tooling with refreshed development dependencies, a browser test harness, and GitHub release and metadata workflows.

[Unreleased]: https://github.com/kitschpatrol/tweakpane-plugin-inputs/compare/1.0.4-fork.1...HEAD
[1.0.4-beta.1]: https://github.com/kitschpatrol/tweakpane-plugin-inputs/releases/tag/1.0.4-beta.1
[1.0.4-beta.2]: https://github.com/kitschpatrol/tweakpane-plugin-inputs/compare/1.0.4-beta.1...1.0.4-beta.2
[1.0.4-beta.3]: https://github.com/kitschpatrol/tweakpane-plugin-inputs/compare/1.0.4-beta.2...1.0.4-beta.3
[1.0.4-beta.4]: https://github.com/kitschpatrol/tweakpane-plugin-inputs/compare/1.0.4-beta.3...1.0.4-beta.4
[1.0.4-beta.5]: https://github.com/kitschpatrol/tweakpane-plugin-inputs/compare/1.0.4-beta.4...1.0.4-beta.5
[1.0.4-fork.1]: https://github.com/kitschpatrol/tweakpane-plugin-inputs/compare/1.0.4-beta.5...1.0.4-fork.1

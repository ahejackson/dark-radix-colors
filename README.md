# Dark Radix Colors

This is an unofficial fork of the excellent [Radix Colors](https://radix-ui.com/colors), **a gorgeous, accessible color system.**

You may be looking for the [original repo](https://github.com/radix-ui/colors).

## Differences

In Radix Colors, all CSS variables for dark mode colors are attached to a `.dark, .dark-theme` selector, where they shadow their light mode equivalents.

Sometimes, you might want to be able to refer to dark mode colors directly, and at the same time as their light mode equivalents.

One example would be to use the new `light-dark` CSS functions.

This fork attaches all CSS variables (light and dark) to the `:root` selector. Color palettes intended for dark mode have `-dark` in their name, between the color and the numeric color scale indicator, so `red-1` becomes `red-dark-1` and `red-a1` becomes `red-dark-a1`.

Light and dark mode color palettes can then be used at the same time:

```css
@import 'dark-radix-colors/red.css';
@import 'dark-radix-colors/red-dark.css';

.red {
  background-color: light-dark(var(--red-1), var(--red-dark-1));
}
```

## Documentation

For the full official documentation, visit [radix-ui.com/colors/docs](https://radix-ui.com/colors/docs).

## Installation

`pnpm add dark-radix-colors`

## Authors

- Colm Tuite ([@colmtuite](https://twitter.com/colmtuite))
- Vlad Moroz ([@vladyslavmoroz](https://twitter.com/vladyslavmoroz))

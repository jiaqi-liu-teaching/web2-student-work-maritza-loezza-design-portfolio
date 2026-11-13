# Project page design system

Shared component rules live in `design-system.css`, loaded last on all five project detail pages. The home page is independent. Existing project colors, decorative artwork and brand font specimens remain project-specific.

| Token | Mobile <=600px | Tablet 601–1024px | Desktop >1024px |
| --- | --- | --- | --- |
| Section gap | 56px | 72px | 96px |
| Section heading | 34px | 44px | 52px |
| Heading to content | 24px | 32px | 32px |
| Body type | 14px / 1.6 | 16px / 1.6 | 17px / 1.6 |
| Metadata label | 11px / 1.4 | 13px / 1.4 | 13px / 1.4 |
| Metadata value | 14px / 1.5 | 15px / 1.5 | 16px / 1.5 |
| Metadata row gap | 24px | 28px | 28px |

- `project-section`: top-level section spacing. Nested sections use their parent spacing.
- `project-section-title`: Bebas Neue section headings. Do not apply to font specimens.
- `project-meta`: equal two-column grid with left-aligned items and natural wrapping.
- `project-meta-item`: label and value aligned at the top of each cell.
- `project-mobile.css`: common 18px mobile content gutter. PetGuard's full-width link banner and project footers remain edge-to-edge.
- `navigation.css`: shared navigation sizing, independent of project content.

Adjust shared tokens rather than adding more per-page mobile overrides. Keep component internals, palette swatches, decorative graphics and font specimen styling local to their project.

## Overview spacing contract

All five overviews use `project-overview-section` and `project-overview-copy`. The copy has exactly three direct children: heading, description, metadata grid. Their margins and padding are zero; the copy gap alone controls spacing (24px mobile, 32px larger screens). Metadata cells use their shared row/column gaps. Overview visual columns use a 32px mobile gap. Normal top-level sections use the section-space token; last-child margins cannot add a hidden mobile section tail. Content length and artwork proportions may still change total section height.

## Final mobile rhythm

`--content-gap: 24px` controls the major vertical gaps inside every project section, including hero, overview, font groups and stacked image groups. `--section-space: 56px` controls gaps between project content sections. Margins on their direct content blocks are zero to prevent addition/collapse. Small semantic label/value gaps are retained. Footer navigation intentionally uses the approved 20px transition. Hero top clearance and full-bleed artwork are independent of content rhythm.

## Tablet layout

`tablet-layout.css` loads last only between 601px and 1024px. All ordinary content sections share 28px side gutters. Full-width banners, PetGuard's Hi-Fi marquee and footers stay full width. From 800px, overviews keep flexible two-column layouts; narrower tablet overviews stack, and three-font groups use two columns. Frosty uses the latest equal-height illustration columns with 20px column gaps. El Origen uses equal logo/palette columns and matching panel heights. Desktop and mobile rules remain independent.

# Kurtosis Labs — Visual Branding Guidelines

This guide documents the current Kurtosis Labs website and defines how to preserve its visual identity when extending it. It is based on the homepage, global stylesheet, page metadata, logo, favicon, and both mountain assets reviewed on September 7, 2026. Values below describe the implemented website unless explicitly marked as guidance for future work.

## 1. Brand direction

**Visual thesis:** institutional clarity expressed through disciplined typography, a restrained navy-and-teal palette, generous space, and expansive mountain imagery.

The site introduces systematic on-chain fixed income and risk infrastructure for institutions. Its presentation should feel measured, precise, transparent, and enduring.

- Let strong typography and composition establish confidence.
- Use mountains to express perspective, stability, and a long-term outlook.
- Keep teal selective: a key word, a small marker, an icon, or an interaction state.
- Separate content with whitespace and fine rules.
- Keep layouts editorial, with clear reading order and concise copy.
- Avoid neon colors, speculative trading imagery, ornamental gradients, heavy shadows, pill-shaped controls, and dense collections of floating cards.

The defining headline is **“Yield with discipline.”** The supporting statement is **“A measured approach to on-chain fixed income. Built for institutions. Grounded in risk.”**

## 2. Logo and brand name

Use the full name **Kurtosis Labs**. In the visual wordmark, append a teal period: **Kurtosis Labs.**

The logo combines an angular, geometric K mark with a bold Helvetica wordmark. Reuse the existing SVG path in `Mark()` in [app/page.tsx](app/page.tsx); do not substitute a typed K or redraw the symbol. Its SVG view box is `0 0 36 38`, and its fill inherits `currentColor`.

| Placement | Wordmark | Mark box | Mark-to-text gap |
| --- | --- | --- | --- |
| Desktop header | 23px, weight 700, tracking −0.9px | 29 × 33px | 11px |
| Header at ≤900px | 21px | 29 × 33px | 11px |
| Header at ≤600px | 20px | 25 × 33px | 8px |
| Header at ≤370px | 17px | 23 × 33px | 8px |
| Desktop footer | 19px | 23 × 27px | 11px |
| Footer at ≤600px | 17px | 23 × 27px | 8px |

The mark boxes above are the CSS dimensions; retain the SVG's intrinsic proportions within them. Keep the lockup on one line. The current header and footer place the navy logo on white.

The [favicon](public/favicon.svg) uses a white K inside a navy 40 × 40 view box, with a 5-unit corner radius on its background. This compact favicon treatment does not establish rounded corners for other components.

**Guidance for future use:** preserve the mark's geometry, the wordmark spelling, the teal period, and ample surrounding space. Do not stretch, rotate, add shadows, or use the logo over visually busy imagery. No separate minimum clear-space standard is encoded in the current site.

## 3. Color palette

### Core colors

| Role | Value | Current use |
| --- | --- | --- |
| White | `#FFFFFF` | Page, header, footer; text on dark surfaces |
| Brand navy | `#102436` | Main text, logo, primary theme token |
| Brand teal | `#367E80` | Headline emphasis, wordmark period, icons, eyebrow squares, focus outline |
| Muted slate | `#566571` | Approach and principle body copy |
| Fine border | `#D9E1E6` | Principle grid dividers |
| Dark section navy | `#0D2132` | Philosophy section background and shading |
| Light teal | `#81BDBB` | Small accents against dark navy |

### Supporting colors

| Role | Value |
| --- | --- |
| Hero fallback background | `#D8E3EC` |
| Hero overlay base | `#E9F0F5` |
| Hero description | `#344959` |
| Primary button background | `#112739` |
| Primary button hover | `#285560` |
| Outlined navigation button border | `#C6D0D7` |
| Outlined navigation button hover background | `#F0F5F7` |
| Secondary heading line | `#758490` |
| Section index and principle numbers | `#667580` |
| Dark-section eyebrow text | `#B5CBD6` |
| Dark-section body text | `#BBCAD5` |
| Dark-section signoff | `#D1DCE3` |
| Footer descriptor | `#647481` |
| Selection background / foreground | `#B5D7D5` / `#102436` |
| Hero bottom divider | `#10243630` (navy at approximately 19% opacity) |

White and navy carry the page. Teal is an accent rather than a large-area background. Photography supplies the remaining cool blue-gray tones. Gradients serve text legibility over photography; they are not decorative fills for buttons or text.

### Existing CSS tokens

```css
:root {
  --background: #fff;
  --foreground: #102436;
  --primary: #102436;
  --primary-foreground: #fff;
  --border: #d9e1e6;
  --ring: #367e80;
  --teal: #367e80;
  --muted: #566571;
}
```

The homepage button uses `#112739`, which is slightly different from the `--primary` token. Preserve that distinction when reproducing the existing page.

The stylesheet also contains `.dark` overrides: background `#102436`, foreground `#FFFFFF`, primary and ring `#81BDBB`, primary foreground `#102436`, and border `#354858`. The current page does not activate `.dark` or provide a theme switch. The intentionally dark philosophy section is part of the normal page design. These overrides alone do not constitute a fully designed dark mode, because several page colors are hard-coded.

## 4. Typography

Use the existing system font stack throughout:

```css
font-family: Helvetica, "Helvetica Neue", Arial, sans-serif;
```

Helvetica is the first choice. Actual rendering depends on installed fonts; Arial is the fallback when neither Helvetica family is available. There is no bundled webfont. Do not introduce a second display family without a deliberate brand change.

| Element | Desktop size | Weight | Line height | Letter spacing |
| --- | --- | --- | --- | --- |
| Hero H1 | `clamp(70px, 7.2vw, 110px)` | 500 | 0.98 | −6px |
| Section H2 | `clamp(34px, 3.6vw, 54px)` | 500 | 1.12 | −2px |
| Philosophy H2 | `clamp(38px, 4vw, 60px)` | 500 | 1.12 | −2px |
| Principle H3 | 21px | 500 | 1.3 | −0.65px |
| Hero description | 18px | Regular | 1.65 | Normal |
| Approach introduction | 18px | Regular | 1.8 | Normal |
| Principle body | 16px | Regular | 1.75 | Normal |
| Philosophy body | 17px | Regular | 1.8 | Normal |
| Eyebrow | 12px | 600 | 1.6 | 1.65px |
| Navigation and button labels | 14px | Regular | Inherited | Normal |
| Section index | 12px | Regular | Inherited | 1.6px |
| Principle number | 12px | Regular | Inherited | 1px |
| Hero bottom labels | 12px | 600 | Inherited | 1.4px |

Headlines use medium weight and tight tracking. Reserve bold weight for the wordmark and semibold for small labels. Body copy remains regular, with generous line height.

Use sentence case for headings, body copy, and actions. Use uppercase with wide tracking for eyebrows and small editorial labels. Preserve the intentional two-line H1: “Yield with” followed by “discipline.” The emphasized second line is teal and upright; the `<em>` element is explicitly styled with `font-style: normal`.

The approach heading uses navy for “A clearer view.” and muted `#758490` for “A stronger foundation.” Avoid emphasizing every line equally.

## 5. Page composition and spacing

The current page follows this sequence:

1. White header with the logo left and navigation right.
2. Full-width mountain hero with left-aligned text and one primary action.
3. White approach section with a split introduction and three principles.
4. Dark philosophy section with a subdued mountain panorama.
5. Compact white footer.

### Layout measurements

| Element | Desktop behavior |
| --- | --- |
| Header | 100px tall; 5.8% horizontal padding |
| Main section wrapper | Maximum width 1600px; centered; 5.8% horizontal padding |
| Hero | Minimum height 660px; height `min(760px, calc(100svh - 100px))` |
| Hero copy | 95px top, 5.8% sides, 125px bottom |
| Hero description measure | Maximum width 480px |
| Hero bottom strip | 69px tall; inset 5.8% on both sides; top rule |
| Approach section | 91px top and 93px bottom padding |
| Approach heading grid | `1.3fr 1fr`; 70px gap; 65px bottom margin |
| Approach introduction measure | Maximum width 475px |
| Principle grid | Three equal columns; 1px top rule and internal vertical rules |
| Principle spacing | 35px top and inter-column padding; no outside left/right inset |
| Principle text measure | Maximum width 365px |
| Philosophy section | Minimum height 510px; content padding 76px top / 77px bottom |
| Philosophy body measure | Maximum width 485px |
| Footer | Minimum height 112px; 34px vertical / 5.8% horizontal padding |

The header and hero remain full width; they do not use the capped section wrapper. The large section gaps are intentional. Do not compress them into generic card spacing.

There is no single spacing-token scale in the current stylesheet. Reuse the established component measurements rather than claiming a strict 4px or 8px grid.

## 6. Photography and overlays

Use the supplied assets as the visual references for future imagery:

| Asset | Dimensions | Purpose |
| --- | --- | --- |
| [mountain-hero.png](public/mountain-hero.png) | 1672 × 941px | Snow-covered peak above clouds, with pale open space left and a strong peak right |
| [mountain-range.png](public/mountain-range.png) | 2172 × 724px | Wide alpine panorama beneath the dark philosophy section |

Maintain cool, desaturated blues, pale cloud whites, and dark rocky detail. Select compositions with enough quiet space behind text. Avoid warm sunset grading, artificial neon, embedded typography, illustrations, or unrelated finance stock imagery.

### Hero treatment

- Fill the section with `object-fit: cover`.
- Desktop image position: `center 48%`; at widths ≥1600px: `center 53%`.
- Overlay: a 90-degree gradient using `rgba(233,240,245,.93)` at 0%, `.75` at 28%, `.12` at 59%, and transparent at 76%.
- Keep the headline in the light left-hand area while the peak anchors the right.
- At ≤900px, position the image at `60% center` and use the lighter horizontal wash defined in the stylesheet.
- At ≤600px, position the image at `66% bottom` and switch to a vertical wash: `#e9f0f5ed` at 0%, `#e9f0f5d9` at 28%, `#e9f0f532` at 60%, and `#e9f0f510` at 80%.

### Philosophy treatment

- Use the `#0D2132` background beneath the panorama.
- Desktop image: 95% width and height, right offset −10%, bottom aligned, opacity 0.38, and `mix-blend-mode: luminosity`.
- Desktop shade: 90-degree gradient from `#0d2132` at 5%, through `#0d2132e6` at 37%, to `#0d213233` at 90%.
- Mobile image: 155% width, 65% height, right offset −50%, opacity 0.4.
- Mobile shade: vertical gradient from `#0d2132` at 0%, through `#0d2132b3` at 60%, to `#0d213220`.

Keep this image secondary to the white heading and pale body text. The hero image has descriptive alt text; the philosophy panorama is decorative and uses an empty alt attribute.

## 7. Components and visual details

### Navigation

Desktop navigation uses 14px text and 36px gaps. Standard links have 10px vertical padding and turn teal on hover. “About the lab” is a square-cornered outlined link with a 1px border, 14px vertical / 18px horizontal padding, a 26px label-to-arrow gap, and a 16px northeast arrow.

### Primary action

“Explore our approach” is an inline-flex link with a solid dark navy fill, white text, square corners, no shadow, 19px vertical / 23px horizontal padding, and a 40px label-to-icon gap. Its northeast arrow is 19px.

On hover, the background becomes `#285560` and the button moves upward 2px. Both transitions last 0.2 seconds. On mobile, padding becomes 16px / 19px and the gap becomes 32px.

### Eyebrows and small accents

An eyebrow begins with a 6 × 6px teal square, followed by a 12px gap and uppercase text. Its desktop bottom margin is 30px. The philosophy section uses a light-teal square and pale blue-gray text. Its signoff starts with a 28 × 1px light-teal rule and a 15px gap.

### Principle columns

Use flat columns separated by thin rules. Each column contains a teal line icon opposite a small gray number, then a short heading and paragraph. Do not add filled card backgrounds, rounded containers, or shadows.

The existing principles are:

- **01 — Systematic by design.** `ChartNoAxesCombined`
- **02 — Transparent at every layer.** `ScanLine`
- **03 — Risk comes first.** `ShieldCheck`

Use Lucide icons to preserve the shared geometry. Principle icons are 29px with a 1.3 stroke width. Utility arrows use the library's default stroke: down arrow 18px, primary action arrow 19px, navigation and footer arrows 16px. Avoid mixing solid pictograms or decorative icon containers into this system.

### Footer

Place the reduced logo left, “Systematic. Transparent. Institutional.” in the middle, and “Back to top” with a northeast arrow right. The footer is white, with muted secondary text and no decorative background.

## 8. Responsive behavior

Breakpoints are based on viewport width. Rules at narrower breakpoints override broader ones.

| Width | Implemented changes |
| --- | --- |
| ≥1600px | Hero copy top padding becomes 120px; hero image position becomes `center 53%` |
| ≤900px | Header becomes 84px tall with 5% side padding; navigation gap 23px; hero height 690px and minimum height 0; hero copy padding 90px / 5% / 120px; H1 83px with −4.5px tracking |
| ≤900px, continued | Approach heading becomes two equal columns with 40px gap; introduction becomes 16px; principle side spacing becomes 22px and H3 becomes 19px; footer can wrap and its middle descriptor is hidden |
| ≤600px | Header becomes 79px tall; ordinary navigation links are hidden while the outlined action remains; hero height 740px; hero copy padding 57px / 6% / 100px |
| ≤600px, continued | H1 becomes `clamp(56px, 16vw, 72px)` with −4px tracking; hero body becomes 16px with a 300px maximum measure; explicit desktop-only description break is hidden |
| ≤600px, continued | Section gutters become 6%; approach padding becomes 59px top and bottom; heading grid stacks with 24px gap and 34px bottom margin; section index is hidden |
| ≤600px, continued | General H2 becomes 36px with −1.5px tracking; philosophy H2 becomes 39px; principle H3 becomes 22px; body copy is 16px |
| ≤600px, continued | Principles stack with 28px vertical padding and horizontal dividers; vertical borders disappear; the last principle has no bottom border or bottom padding |
| ≤600px, continued | Hero bottom strip becomes 59px tall; right-hand metadata is hidden and the scroll arrow moves right; philosophy minimum height becomes 560px with 56px top / 90px bottom content padding |
| ≤600px, continued | Footer padding becomes 28px / 6%, with an 18px gap; signoff gap becomes 10px |
| ≤370px | Header side padding becomes 4%; logo wordmark becomes 17px; navigation action padding becomes 10px with a 6px gap |

There is no mobile hamburger menu. Preserve the visible “About the lab” action and the page's in-page navigation model unless navigation requirements change.

## 9. Interaction and accessibility

The current reading flow uses anchor links to `#main`, `#approach`, `#principles`, and `#about`.

- Keep the keyboard-accessible “Skip to content” link; it appears near the top-left when focused.
- Preserve the 3px teal `:focus-visible` outline with a 6px offset on links.
- Keep accessible names on navigation, the home logo, and the icon-only scroll link.
- Preserve a single H1, section H2s, principle H3s, semantic page landmarks, and section heading associations.
- Maintain descriptive alt text for meaningful images and empty alt text for decorative images.
- Smooth scrolling uses 30px top scroll padding; the principle grid additionally has a 50px scroll margin.
- Under `prefers-reduced-motion: reduce`, scrolling becomes immediate and transitions are disabled.

**Guidance for future work:** check text contrast, keyboard focus, image-overlay legibility, touch target size, and text enlargement when changing colors or layouts. Check narrow screens and long content for clipping, especially because the hero uses fixed mobile heights and tightly tracked headings. These are acceptance checks, not a claim that the current website has passed a comprehensive accessibility audit. Essential body copy should retain the current 16px minimum; 12px text is reserved for secondary editorial labels.

## 10. Brand voice

Copy supports the visual restraint. Use short, specific statements about research, transparency, portfolio construction, execution, liquidity, exposure, and risk. Explain the institutional purpose without exaggerated promises.

- Favor measured language: “A clearer view,” “Risk comes first,” “A long-term mindset.”
- Use sentence-ending periods in declarative headings, as the current page does.
- Keep labels direct: “Our approach,” “Principles,” “About the lab.”
- Do not introduce unsupported performance figures, guaranteed returns, or hype-driven calls to action.
- Keep headline emphasis selective and paragraphs compact enough to preserve the established text measures.

## 11. Applying this guide

The current homepage uses custom classes in [app/globals.css](app/globals.css), with structure and content in [app/page.tsx](app/page.tsx). [app/layout.tsx](app/layout.tsx) defines the page title and description. The generic components under `components/ui/` are available in the project but are not rendered by this homepage; their default styling is not the brand specification.

For future page work:

- [ ] Use the Helvetica font stack, navy text, selective teal accents, and approved wordmark.
- [ ] Preserve medium-weight, tightly tracked headings and readable body copy.
- [ ] Align content to the existing section gutters and text measures.
- [ ] Use square buttons, thin dividers, and flat content sections.
- [ ] Keep mountain imagery cool and subdued, with overlays appropriate to text placement.
- [ ] Apply the documented mobile stacking, cropping, and navigation behavior.
- [ ] Preserve visible keyboard focus, semantic structure, alt text, and reduced-motion support.
- [ ] Review the result at narrow mobile, tablet, desktop, and wide desktop sizes, plus enlarged text.
- [ ] Update this document alongside intentional changes to shared visual rules.

This guide captures the website's current identity. It does not define unimplemented product surfaces such as charts, forms, dashboards, error states, or a complete dark theme. Any future patterns should extend these principles and be documented when introduced.

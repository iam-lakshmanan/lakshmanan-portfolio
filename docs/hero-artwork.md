# Hero artwork and motion

Generated with the built-in Imagegen tool for this portfolio. The original is saved as `public/images/hero-system-sculpture.png`; Next.js serves responsive optimized versions through `next/image`.

## Final prompt

Use case: stylized-concept. Asset type: hero artwork for Lakshmanan's professional full-stack, cloud and DevOps developer portfolio. Create a premium 3D editorial sculpture representing software layers connecting into a reliable system: three precisely machined graphite and brushed-silver rectangular frames, arranged as a vertically rising, slightly offset open architectural stack, linked by one elegant translucent sea-glass teal ribbon threading through their centers. Realistic bevels, fine metal grain, physically believable glass refraction, restrained teal rim lighting. Studio background in deep ink navy (#0b1120), soft floor shadow and generous negative space at all edges. Square composition, entire sculpture visible, three-quarter perspective, strong readable silhouette at small screen sizes. Sophisticated product-photography quality, tactile and calm rather than sci-fi. No people, no text, no letters, no logos, no UI, no watermark, no stars, no neon bloom, no decorative floating particles.

## Design decisions

- Taste direction: preserve the developer portfolio's navy/teal identity, Geist typography, compact project cards, navigation labels, URLs, and contact flow. Layout variation 6, motion 7, density 4.
- Replace the terminal illustration with a real generated asset. Keep all six projects and resume facts.
- Hero parallax gives the artwork depth. Word reveals guide section reading, card reveals establish hierarchy, and the experience rail follows reading progress.
- Use the existing Framer Motion dependency and motion values rather than adding a second animation engine. No scroll hijacking or pinned content.
- Existing navy theme and per-project accent colors are intentional preservation exceptions to Taste's general defaults. Card radii remain 16-18px, hero media 24px, controls 8-10px.
- On mobile, hero parallax is disabled and the artwork stacks below the introduction. Reduced-motion preference and the existing Motion toggle make all new animations static.
- Existing page routes, metadata, section anchors and form field names remain unchanged. Layering remains the established scale: content 0, hero copy 1, navigation 50, skip link 100.

## Verification

- Production build and TypeScript checks pass. Next.js reports the existing ESLint configuration cannot run because its packages are not installed.
- Browser checks pass at desktop, 768px, 390px and 320px. All six projects, section anchors, mobile navigation, Escape focus restoration, and persisted motion preferences are covered.
- System reduced-motion mode shows all content without running animations. Text at 200% does not cause horizontal overflow. No browser runtime or hydration errors were recorded.
- Local mobile Lighthouse check: performance 94, accessibility 100, best practices 100; CLS 0 and total blocking time 150ms. LCP was 2.7s, so the 2.5s target is not yet met in this lab run. These are local lab results, not real-user measurements.
- npm audit reports two advisories in the existing Next.js 15/PostCSS dependency chain. Its suggested fix requires a major Next.js upgrade, which is outside this visual update.

// Shared class sets, so every card and photo uses the same radius, padding and shadow.
// Hover and motion classes stay on each component; these are only the resting look.

// Card: 32px radius, 24px padding (32px from 768px), soft shadow and hairline ring.
export const card = "rounded-[2rem] bg-white p-6 shadow-soft ring-1 ring-line md:p-8";
// Card on a dark surface (same shape, translucent fill).
export const cardDark = "rounded-[2rem] bg-white/[0.06] p-6 ring-1 ring-white/10 md:p-8";
// Panel: a full-width single card (Values, treatment details). Same radius as a card, roomier padding.
export const panel = "rounded-[2rem] p-6 md:p-8 lg:p-12";
// Equal-height card in a grid row: content stacks, last item pins to the bottom.
export const cardFill = "flex h-full flex-col";

// Photo: the hero photo's 44px radius and lift shadow, fixed ratio, never taller than 520px.
export const photo = "relative overflow-hidden rounded-[2.75rem] bg-accent shadow-lift";
export const photoFrame = "aspect-[4/5] max-h-[520px] w-full";
// Mask radius that matches `photo`, for clip-path reveal animations.
export const photoMaskRadius = "44px";

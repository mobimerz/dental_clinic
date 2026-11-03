# A-Zee Dental & Implant Centre — Website

Next.js (App Router, JavaScript) + Tailwind CSS v4 + Motion + Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Editing content

| What | Where |
| --- | --- |
| Phone, address, hours, Google rating, map links | `src/data/clinic.js` |
| Treatments list | `src/data/treatments.js` |
| Patient reviews carousel | `src/data/reviews.js` (genuine Google reviews only; empty list shows a Google Reviews CTA) |
| Photos | `public/images/clinic/` + paths in `clinicImages` in `src/data/clinic.js` |

Set `NEXT_PUBLIC_SITE_URL` to the live domain so Open Graph URLs resolve correctly.

## Photos

All photos in `public/images/clinic/` come from the clinic's Google Business Profile:

- `dr-aysha-aslam.jpg`: doctor portrait (hero)
- `reception.jpg`: reception, cropped from the profile's promotional banner
- `treatment-room-1.jpg`, `treatment-room-2.jpg`: treatment rooms
- `dentist-at-work.jpg`: dentist treating a young patient

Some Google Business Profile photos may be uploaded by the public rather than the clinic. Confirm the clinic owns or
has permission to use each photo before going live, and replace any with original high-resolution files when available.

## Structure

```
src/app/            layout.js (metadata, font), page.js (homepage), globals.css (theme tokens)
src/components/
  layout/           Header, Footer
  home/             one component per homepage section
  common/           Button, SectionHeading, Reveal, Counter, Logo, icons, FloatingContact…
src/data/           editable business content
src/lib/booking.js  treatment pre-selection event for the appointment form
```

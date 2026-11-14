// Treatments offered, based on the services listed on the clinic's Google Business Profile.
// `featured` treatments appear on the home page; every treatment gets a detail panel on /treatments.
// Keep copy general and non-promissory: suitability is always decided at the consultation.

export const treatmentCategories = [
  { id: "all", label: "All" },
  { id: "preventive", label: "Preventive" },
  { id: "restorative", label: "Restorative" },
  { id: "cosmetic", label: "Cosmetic" },
  { id: "orthodontic", label: "Orthodontic" },
  { id: "surgical", label: "Surgical" },
  { id: "kids", label: "Kids" },
];

export const treatments = [
  {
    slug: "dental-implants",
    title: "Dental Implants",
    icon: "implant",
    category: "restorative",
    featured: true,
    description:
      "A fixed, natural-looking option to replace missing teeth, planned around your bite, bone and comfort.",
    summary:
      "An implant replaces the root of a missing tooth and supports a crown that looks and feels close to a natural tooth. It is a long-term option that avoids reshaping the teeth next to the gap.",
    helpsWith: [
      "One or more missing teeth",
      "Loose or uncomfortable dentures",
      "Wanting a fixed option instead of a removable one",
    ],
    steps: [
      "Examination and X-rays to check bone and gum health",
      "A clear treatment plan with timelines explained",
      "Implant placement, followed by a healing period",
      "A custom crown fitted and checked for bite and comfort",
    ],
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    icon: "rootCanal",
    category: "restorative",
    featured: true,
    description:
      "Treatment for infected or painful teeth that aims to relieve discomfort and preserve your natural tooth.",
    summary:
      "When the inner pulp of a tooth is infected or inflamed, a root canal treatment cleans and seals it so the tooth can be saved. Our focus is on keeping the procedure as comfortable and painless as possible.",
    helpsWith: [
      "Lingering pain or sensitivity to hot and cold",
      "A deep cavity or a cracked tooth",
      "Swelling or tenderness around a tooth",
    ],
    steps: [
      "Diagnosis with an examination and X-ray",
      "Local anaesthesia so you stay comfortable",
      "Cleaning, shaping and sealing the root canals",
      "A filling or crown to protect the treated tooth",
    ],
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    icon: "smile",
    category: "cosmetic",
    featured: true,
    description:
      "Aesthetic restorations and smile enhancements tailored to the shape, shade and balance of your smile.",
    summary:
      "Small changes can make a big difference. Cosmetic treatments improve the shape, shade and alignment of teeth, including closing gaps such as midline spacing between the front teeth.",
    helpsWith: [
      "Chipped, worn or uneven teeth",
      "Gaps between the front teeth",
      "Discoloured or mismatched fillings",
    ],
    steps: [
      "A smile consultation to understand what you'd like to change",
      "Options explained, from simple bonding to crowns",
      "Treatment carried out with careful shade matching",
      "A final review of how your smile looks and feels",
    ],
  },
  {
    slug: "teeth-whitening",
    title: "Teeth Whitening",
    icon: "sparkles",
    category: "cosmetic",
    featured: true,
    description:
      "Professional whitening options to help lift stains and brighten your smile under dental supervision.",
    summary:
      "Professional whitening lifts stains from coffee, tea and everyday life more safely than over-the-counter kits, because your teeth and gums are checked first and the process is supervised.",
    helpsWith: [
      "Yellowing or dull-looking teeth",
      "Stains from tea, coffee or tobacco",
      "Brightening your smile before an occasion",
    ],
    steps: [
      "A check-up to make sure whitening is right for you",
      "Cleaning to remove surface deposits",
      "Whitening carried out under supervision",
      "Aftercare tips to help the results last",
    ],
  },
  {
    slug: "dental-braces",
    title: "Braces & Clear Aligners",
    icon: "braces",
    category: "orthodontic",
    featured: true,
    description:
      "Orthodontic treatment to gradually straighten teeth and improve bite alignment, guided at every review.",
    summary:
      "Straighter teeth are easier to clean and more comfortable to bite with. Alongside traditional braces, we offer clear aligners such as Invisalign: removable trays that let you eat what you like and brush as usual.",
    helpsWith: [
      "Crowded, crooked or spaced teeth",
      "An uneven bite",
      "Wanting a discreet, removable option",
    ],
    steps: [
      "An orthodontic assessment with photos and records",
      "Choosing between braces and clear aligners",
      "Fitting, with clear instructions for daily care",
      "Regular reviews to track progress until completion",
    ],
  },
  {
    slug: "crowns-and-bridges",
    title: "Crowns & Bridges",
    icon: "crown",
    category: "restorative",
    featured: true,
    description:
      "Custom crowns and bridges to restore damaged or missing teeth and bring back everyday chewing comfort.",
    summary:
      "A crown covers and protects a weakened tooth, while a bridge fills the gap left by a missing tooth using the teeth on either side for support. Both are made to match your natural teeth.",
    helpsWith: [
      "A tooth weakened by a large filling or root canal",
      "A cracked or heavily worn tooth",
      "A gap from a missing tooth",
    ],
    steps: [
      "Examination and preparation of the tooth",
      "Impressions taken and a temporary placed",
      "A custom crown or bridge made to your shade",
      "Final fitting and bite adjustment",
    ],
  },
  {
    slug: "wisdom-tooth-extraction",
    title: "Wisdom Tooth Extraction",
    icon: "wisdom",
    category: "surgical",
    featured: true,
    description:
      "Careful assessment and removal of problematic wisdom teeth, with clear guidance for recovery.",
    summary:
      "Getting a wisdom tooth out doesn't have to be scary. We assess the tooth with an X-ray, explain what's involved and take a gentle approach from diagnosis to removal.",
    helpsWith: [
      "Pain or swelling at the back of the mouth",
      "A wisdom tooth that is partly erupted or impacted",
      "Repeated food trapping or gum infection",
    ],
    steps: [
      "X-ray to see the tooth's position",
      "Local anaesthesia for a comfortable procedure",
      "Careful removal of the tooth",
      "Written aftercare and a follow-up if needed",
    ],
  },
  {
    slug: "general-dental-care",
    title: "General Dental Care",
    icon: "shield",
    category: "preventive",
    featured: true,
    description:
      "Check-ups, cleanings, fillings and preventive care for the whole family, all in one place.",
    summary:
      "Regular check-ups catch problems while they're small. Restoring a cavity early is simpler and more comfortable than treating it once it has reached the nerve.",
    helpsWith: [
      "Routine six-monthly check-ups",
      "Small cavities and tooth sensitivity",
      "Bleeding gums or bad breath",
    ],
    steps: [
      "A full examination of teeth and gums",
      "X-rays where needed",
      "Findings explained in plain language",
      "Treatment or a prevention plan agreed together",
    ],
  },
  {
    slug: "teeth-cleaning",
    title: "Professional Teeth Cleaning",
    icon: "sparkles",
    category: "preventive",
    description: "Scaling and polishing to remove plaque and tartar that brushing alone can't reach.",
    summary:
      "A cleaner smile starts with professional dental cleaning. Scaling and polishing remove hardened tartar and surface stains, helping keep gums healthy and breath fresh.",
    helpsWith: [
      "Tartar build-up and surface stains",
      "Bleeding or puffy gums",
      "Keeping on top of oral hygiene",
    ],
    steps: [
      "Gum check to see how healthy they are",
      "Scaling to remove plaque and tartar",
      "Polishing for a smooth, clean finish",
      "Brushing and flossing tips for home",
    ],
  },
  {
    slug: "tooth-coloured-fillings",
    title: "Tooth-Coloured Fillings",
    icon: "shield",
    category: "restorative",
    description: "Natural-looking fillings that repair cavities early and blend in with your teeth.",
    summary:
      "Why restore a cavity while it's small? Because it stays a simple filling. Tooth-coloured materials repair decay and blend in with the rest of your tooth.",
    helpsWith: [
      "Small to medium cavities",
      "Chipped edges of teeth",
      "Replacing old, dark fillings",
    ],
    steps: [
      "Checking the cavity's size and depth",
      "Gently removing the decay",
      "Placing and shaping a tooth-coloured filling",
      "Polishing and checking your bite",
    ],
  },
  {
    slug: "dentures",
    title: "Dentures",
    icon: "crown",
    category: "restorative",
    description: "Comfortable full or partial dentures made to restore your smile and everyday chewing.",
    summary:
      "Dentures replace several or all missing teeth with a removable appliance made to fit your mouth. They help with chewing and speech and support the shape of your face.",
    helpsWith: [
      "Several or all teeth missing",
      "Difficulty chewing or speaking clearly",
      "Replacing old, ill-fitting dentures",
    ],
    steps: [
      "Examination and impressions",
      "Trial fittings to check fit and appearance",
      "Final dentures delivered with care instructions",
      "Adjustments to fine-tune comfort",
    ],
  },
  {
    slug: "kids-dentistry",
    title: "Kids' Dentistry",
    icon: "smile",
    category: "kids",
    description: "Gentle, friendly dental care for children, from first check-ups to space maintainers.",
    summary:
      "Little teeth deserve big care. Cavities in children can progress quickly and affect eating and comfort, so we focus on early check-ups, prevention and treatments like space maintainers that keep growing smiles on track.",
    helpsWithTitle: "How we can help",
    helpsWith: [
      "First dental visits & routine check-ups",
      "Milk tooth cavities",
      "Pulpotomy, pulpectomy & pulp capping",
      "Preventive treatments & pit and fissure sealants",
      "Space maintainers for early tooth loss",
    ],
    steps: [
      "A friendly introduction",
      "Gentle dental examination",
      "Treatment options explained to parents",
      "Brushing & dietary guidance",
    ],
  },
];

export const featuredTreatments = treatments.filter((t) => t.featured);

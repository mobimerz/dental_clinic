// Blog posts. Each post's body is a list of blocks, rendered by components/blog/ArticleBody:
//   { type: "lead", text }               – large opening line
//   { type: "p", text }                  – paragraph; **double asterisks** make text bold
//   { type: "h2", id, text }             – section heading; `id` is its anchor and its entry in "In this article"
//   { type: "h3", text }                 – sub-heading
//   { type: "list", items }              – bullet list; an item is a string or { term, text }
//   { type: "table", head, rows }        – simple table
//   { type: "note", text }               – small italic note
// `faqs` show in the FAQ section under the article (and as FAQ structured data for Google).
// `cta` is the closing banner. Newest post first.

export const posts = [
  {
    slug: "loose-teeth-in-adults",
    title: "Loose Teeth in Adults:",
    highlight: "Causes, Treatment Options & Cost Guide",
    seoTitle: "Loose Teeth in Adults: Causes, Treatment Options & Cost Guide",
    excerpt:
      "Understand why teeth become loose, the treatment options available and the factors that affect cost.",
    category: "Gum Health",
    date: "2026-11-22",
    image: {
      src: "/images/blog/loose-teeth-treatment-bangalore.jpg",
      width: 1536,
      height: 1024,
      alt: "Loose teeth treatment in Bangalore at A-Zee Dental: common causes (gum disease, dental trauma, bone loss, excessive bite forces, infection or tooth decay), treatment options (scaling and gum treatment, root canal treatment, crowns and bridges, dental implants) and what affects treatment cost.",
    },
    content: [
      { type: "lead", text: "Can a loose tooth be saved?" },
      {
        type: "p",
        text: "A loose tooth can affect your ability to chew and smile confidently. While loose baby teeth are normal, mobility in permanent teeth is not and should never be ignored.",
      },
      {
        type: "p",
        text: "The good news is that not every loose tooth needs extraction. Early diagnosis and appropriate treatment may help stabilise the tooth and preserve your natural smile.",
      },
      {
        type: "p",
        text: "At **A-Zee Dental, Bangalore**, we focus on identifying the cause and recommending the right treatment for every patient.",
      },

      { type: "h2", id: "causes", text: "What Causes Loose Teeth in Adults?" },
      {
        type: "p",
        text: "Teeth are supported by the gums, periodontal ligaments and surrounding jawbone. Damage to these structures can cause tooth mobility.",
      },
      { type: "p", text: "Common causes include:" },
      { type: "h3", text: "1. Gum Disease (Periodontitis)" },
      {
        type: "p",
        text: "Plaque and tartar build-up can cause gum inflammation. If untreated, the infection may damage the supporting bone and tissues.",
      },
      { type: "p", text: "Common signs:" },
      {
        type: "list",
        items: ["Bleeding or swollen gums.", "Persistent bad breath.", "Receding gums.", "Teeth appearing longer or shifting position."],
      },
      { type: "h3", text: "2. Dental Trauma or Injury" },
      { type: "p", text: "Falls, accidents or sports injuries can damage the supporting tissues and loosen a tooth." },
      { type: "h3", text: "3. Teeth Grinding (Bruxism)" },
      { type: "p", text: "Repeated grinding can put excessive pressure on teeth and their supporting structures." },
      { type: "h3", text: "4. Bone Loss Around Teeth" },
      { type: "p", text: "Advanced gum disease can cause supporting bone loss, making teeth increasingly mobile." },
      { type: "h3", text: "5. Excessive Bite Forces" },
      { type: "p", text: "Uneven or excessive biting forces can contribute to tooth mobility. Common factors include:" },
      {
        type: "list",
        items: [
          { term: "Teeth Grinding", text: "Repeated pressure on teeth and supporting tissues." },
          { term: "Clenching", text: "Habitual clenching increases the load on teeth." },
          { term: "Uneven Bite", text: "Uneven distribution of biting forces places stress on certain teeth." },
          { term: "Missing Teeth", text: "Changes in chewing-force distribution can place additional stress on remaining teeth." },
        ],
      },

      { type: "h2", id: "treatment", text: "Treatment Options for Loose Teeth" },
      { type: "p", text: "Treatment depends on the cause, degree of mobility and supporting bone condition." },
      { type: "h3", text: "1. Scaling and Root Planing (Deep Cleaning)" },
      {
        type: "p",
        text: "Removes plaque and tartar from below the gum line and cleans the root surfaces, helping control infection and prevent further damage.",
      },
      { type: "h3", text: "2. Periodontal Treatment" },
      { type: "p", text: "Advanced gum disease may require:" },
      {
        type: "list",
        items: ["Periodontal flap surgery.", "Deep gum pocket treatment.", "Regenerative procedures or bone grafting in selected cases."],
      },
      { type: "p", text: "The aim is to control infection and preserve supporting tissues." },
      { type: "h3", text: "3. Tooth Splinting" },
      {
        type: "p",
        text: "A loose tooth may be stabilised by connecting it to neighbouring teeth using a bonding material and suitable splint.",
      },
      { type: "p", text: "**Benefits:**" },
      { type: "list", items: ["Improves tooth stability.", "Reduces excessive movement.", "Improves chewing comfort."] },
      { type: "p", text: "Splinting may need to be combined with periodontal treatment." },
      { type: "h3", text: "4. Bite Adjustment and Night Guards" },
      {
        type: "p",
        text: "Bite correction or customised night guards may be recommended to reduce excessive forces caused by uneven biting or teeth grinding.",
      },
      { type: "h3", text: "5. Tooth Extraction and Replacement" },
      {
        type: "p",
        text: "When supporting bone is severely damaged and the tooth cannot be predictably saved, extraction may be necessary.",
      },
      { type: "p", text: "Replacement options include:" },
      { type: "list", items: ["**Dental Implant**", "**Dental Bridge**", "**Removable Partial Denture**"] },

      { type: "h2", id: "cost", text: "Loose Teeth Treatment Cost Guide" },
      { type: "p", text: "Treatment costs depend on the diagnosis, severity and procedures required." },
      {
        type: "table",
        head: ["Treatment", "Cost depends on"],
        rows: [
          ["Dental consultation", "Examination and diagnostic requirements"],
          ["Scaling", "Amount of plaque and tartar"],
          ["Deep cleaning / Root planing", "Areas treated and severity of gum disease"],
          ["Periodontal treatment", "Extent of tissue and bone involvement"],
          ["Tooth splinting", "Number of teeth and type of splint"],
          ["Root canal treatment", "Tooth type and complexity"],
          ["Dental crown", "Material and restoration requirements"],
          ["Tooth extraction", "Complexity of extraction"],
          ["Dental implant", "Implant system, bone condition and restoration"],
        ],
      },
      {
        type: "note",
        text: "Actual treatment costs in Bangalore vary depending on the patient's condition, treatment complexity, materials and diagnostic requirements. An individualised treatment plan and cost estimate will be provided after examination.",
      },

      { type: "h2", id: "tighten", text: "Can a Loose Tooth Become Tight Again?" },
      {
        type: "p",
        text: "In some cases, yes. If mobility is related to inflammation, trauma or excessive bite forces, appropriate treatment may improve tooth stability.",
      },
      {
        type: "p",
        text: "However, significant bone loss may limit recovery. Early treatment offers a better opportunity to preserve natural teeth.",
      },

      { type: "h2", id: "prevention", text: "How Can You Prevent Loose Teeth?" },
      {
        type: "list",
        items: [
          "Brush twice daily with a soft-bristled toothbrush.",
          "Floss or use interdental brushes regularly.",
          "Get professional dental cleaning as recommended.",
          "Avoid smoking and tobacco.",
          "Manage conditions such as diabetes.",
          "Wear a night guard if you grind your teeth.",
          "Schedule regular dental check-ups.",
        ],
      },

      { type: "h2", id: "when-to-visit", text: "When Should You Visit a Dentist?" },
      { type: "p", text: "Consult your dentist if you notice:" },
      {
        type: "list",
        items: [
          "Movement in a permanent tooth.",
          "Bleeding or swollen gums.",
          "Pain while chewing.",
          "Changes in tooth position.",
          "Persistent bad breath.",
        ],
      },
      { type: "p", text: "A loose tooth following an accident or injury requires immediate dental attention." },

      { type: "h2", id: "early-treatment", text: "Protect Your Natural Smile with Early Treatment" },
      {
        type: "p",
        text: "A loose tooth should never be ignored. Early diagnosis and appropriate treatment may help preserve your natural teeth and prevent unnecessary tooth loss.",
      },
      {
        type: "p",
        text: "At **A-Zee Dental, Bangalore**, we focus on identifying the cause of tooth mobility and providing suitable treatment options based on individual needs.",
      },
    ],
    faqs: [
      {
        q: "Does a loose tooth always need extraction?",
        a: "No. Periodontal treatment, splinting or bite correction may help save a tooth, depending on its supporting bone and condition.",
      },
      {
        q: "Can scaling help loose teeth?",
        a: "Yes, when gum disease is responsible. It controls infection but cannot restore bone that has already been lost.",
      },
      {
        q: "Is tooth splinting permanent?",
        a: "Not always. Long-term stability depends on periodontal health and maintenance.",
      },
      {
        q: "Is a loose tooth an emergency?",
        a: "A loose permanent tooth needs prompt dental assessment. Following an injury, seek immediate care.",
      },
      {
        q: "Can I tighten a loose tooth at home?",
        a: "No home remedy can reliably tighten a permanent tooth. Avoid wiggling it or chewing hard foods on that side.",
      },
    ],
    cta: {
      title: "Don't Wait for a Loose Tooth to Become a Missing Tooth.",
      description:
        "Book your dental consultation today and take the first step towards healthier gums and stronger teeth.",
      message: "Hello A-Zee Dental, I have a loose tooth and would like to book a consultation.",
    },
  },
];

export const getPost = (slug) => posts.find((p) => p.slug === slug);

// "22 November 2026"
export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

// Reading time at about 200 words a minute, counting the article and its FAQs.
export const readingMinutes = (post) => {
  const text = [
    ...post.content.flatMap((b) =>
      b.type === "list" ? b.items.map((i) => (typeof i === "string" ? i : `${i.term} ${i.text}`)) : b.type === "table" ? b.rows.flat() : [b.text]
    ),
    ...post.faqs.flatMap((f) => [f.q, f.a]),
  ].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
};

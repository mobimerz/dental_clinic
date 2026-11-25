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
    slug: "dental-implants-bangalore-guide",
    title: "Dental Implants in Bangalore:",
    highlight: "Procedure, Recovery & Cost Guide",
    seoTitle: "Dental Implants in Bangalore: Procedure, Recovery & Cost Guide",
    excerpt:
      "How dental implants work, who they suit, what the treatment involves and what affects the cost.",
    category: "Dental Implants",
    date: "2026-11-25",
    image: {
      src: "/images/blog/loose-teeth-treatment-bangalore.jpg",
      width: 1536,
      height: 1024,
      alt: "A-Zee Dental & Implant Centre, Bangalore: dental implant and gum health treatment information.",
    },
    content: [
      { type: "lead", text: "Is a dental implant the right way to replace a missing tooth?" },
      {
        type: "p",
        text: "Losing a tooth affects more than your smile. Chewing becomes harder, neighbouring teeth can drift and the jawbone under the gap slowly shrinks. A dental implant replaces the tooth from the root up, so it looks, feels and works much like a natural tooth.",
      },
      {
        type: "p",
        text: "At **A-Zee Dental & Implant Centre, Bangalore**, every implant plan starts with a proper examination, so you know what to expect before treatment begins.",
      },

      { type: "h2", id: "what-is-an-implant", text: "What Is a Dental Implant?" },
      { type: "p", text: "An implant has three parts that work together:" },
      {
        type: "list",
        items: [
          { term: "Implant post", text: "A small titanium screw placed in the jawbone, acting as the new tooth root." },
          { term: "Abutment", text: "A connector that joins the post to the visible tooth." },
          { term: "Crown", text: "The custom-made tooth on top, matched to the shape and shade of your natural teeth." },
        ],
      },
      {
        type: "p",
        text: "The post bonds with the bone over a few months, which is what gives an implant its stability.",
      },

      { type: "h2", id: "who-is-it-for", text: "Who Is a Good Candidate?" },
      { type: "p", text: "Most healthy adults with a missing tooth can be considered. A few things matter most:" },
      {
        type: "list",
        items: [
          "Healthy gums, free from active infection.",
          "Enough jawbone to hold the implant, which a scan will confirm.",
          "Good control of conditions such as diabetes.",
          "Willingness to keep up with brushing, flossing and regular check-ups.",
        ],
      },
      {
        type: "p",
        text: "Smoking slows healing and raises the risk of implant problems, so we will discuss it with you openly. Limited bone is not always a barrier either. Bone grafting can often rebuild it.",
      },

      { type: "h2", id: "procedure", text: "How the Implant Procedure Works" },
      { type: "h3", text: "1. Consultation and scans" },
      {
        type: "p",
        text: "We examine your mouth, take X-rays or a 3D scan and check the bone and gum health. You receive a clear plan and estimate.",
      },
      { type: "h3", text: "2. Placing the implant" },
      {
        type: "p",
        text: "The post is placed under local anaesthesia, so the procedure itself is comfortable. If a damaged tooth must be removed first, this can sometimes be done in the same visit.",
      },
      { type: "h3", text: "3. Healing" },
      {
        type: "p",
        text: "The bone needs time to bond with the implant. The healing period varies from person to person and is checked at follow-up visits.",
      },
      { type: "h3", text: "4. Abutment and crown" },
      {
        type: "p",
        text: "Once the implant is stable, the abutment and crown are fitted and the bite is adjusted so everything feels natural.",
      },

      { type: "h2", id: "recovery", text: "Recovery and Aftercare" },
      { type: "p", text: "Mild swelling or tenderness for a few days is common. To help healing:" },
      {
        type: "list",
        items: [
          "Take the medicines prescribed exactly as advised.",
          "Stick to soft, lukewarm food for the first few days.",
          "Avoid smoking and alcohol while the area heals.",
          "Keep the area clean with gentle brushing and any rinse we recommend.",
          "Attend every follow-up visit.",
        ],
      },
      {
        type: "note",
        text: "Contact the clinic if you notice increasing pain, persistent swelling, fever or a loose implant after the first few days.",
      },

      { type: "h2", id: "cost", text: "What Affects the Cost of a Dental Implant?" },
      { type: "p", text: "There is no single price, because every mouth is different. The total depends on:" },
      {
        type: "table",
        head: ["Factor", "Why it matters"],
        rows: [
          ["Implant system", "Different brands and designs are available"],
          ["Number of teeth", "Single tooth, several teeth or a full arch"],
          ["Bone condition", "Grafting or sinus work adds to the plan"],
          ["Crown material", "Affects appearance and durability"],
          ["Extra treatment", "Gum treatment or extractions done beforehand"],
        ],
      },
      {
        type: "note",
        text: "A personalised treatment plan and cost estimate is given only after examination, so there are no surprises later.",
      },

      { type: "h2", id: "alternatives", text: "Implant, Bridge or Denture?" },
      {
        type: "p",
        text: "Each option has its place. A **bridge** uses neighbouring teeth for support and is quicker. A **removable denture** is the most economical choice but less stable. An **implant** stands on its own, protects the bone and does not involve the healthy teeth beside it. We will explain what suits your case and budget.",
      },

      { type: "h2", id: "longevity", text: "Making Your Implant Last" },
      {
        type: "p",
        text: "With good hygiene, regular check-ups and no smoking, implants can serve for many years. Cleaning around the implant matters as much as for natural teeth, because gum infection around an implant can affect the bone that supports it.",
      },
    ],
    faqs: [
      {
        q: "Is the implant procedure painful?",
        a: "The area is numbed with local anaesthesia, so you should not feel pain during placement. Some soreness afterwards is normal and manageable with prescribed medicines.",
      },
      {
        q: "How long does the whole treatment take?",
        a: "It depends on how quickly your bone heals and whether grafting or extraction is needed. We will give you a timeline at your consultation.",
      },
      {
        q: "Can implants be done at any age?",
        a: "Adults of any age can be considered once the jaw has finished growing, provided their general and gum health allow it.",
      },
      {
        q: "Do implants need special care?",
        a: "Brush twice daily, clean between the teeth and visit the dentist regularly, just as you would for natural teeth.",
      },
      {
        q: "Can an implant fail?",
        a: "Failures are uncommon, but smoking, poor hygiene and uncontrolled diabetes raise the risk. Early follow-up helps catch problems quickly.",
      },
    ],
    cta: {
      title: "Ready to Replace Your Missing Tooth?",
      description:
        "Book a consultation to find out whether dental implants are right for you and get a clear treatment plan.",
      message: "Hello A-Zee Dental, I would like to book a consultation about dental implants.",
    },
  },
  {
    slug: "root-canal-treatment-explained",
    title: "Root Canal Treatment Explained:",
    highlight: "Symptoms, Procedure & Aftercare",
    seoTitle: "Root Canal Treatment Explained: Symptoms, Procedure & Aftercare",
    excerpt:
      "Why a root canal is needed, what happens during treatment and how to look after your tooth afterwards.",
    category: "Root Canal",
    date: "2026-11-24",
    image: {
      src: "/images/blog/loose-teeth-treatment-bangalore.jpg",
      width: 1536,
      height: 1024,
      alt: "A-Zee Dental & Implant Centre, Bangalore: root canal and tooth-saving treatment information.",
    },
    content: [
      { type: "lead", text: "Does a root canal mean you are going to lose the tooth?" },
      {
        type: "p",
        text: "Quite the opposite. A root canal is a treatment that **saves** a tooth that would otherwise need to be removed. Modern techniques and anaesthesia make it much more comfortable than its reputation suggests.",
      },
      {
        type: "p",
        text: "At **A-Zee Dental & Implant Centre, Bangalore**, we explain every step before we begin, so you always know what is happening and why.",
      },

      { type: "h2", id: "what-is-rct", text: "What Is a Root Canal Treatment?" },
      {
        type: "p",
        text: "Inside every tooth is soft tissue called the pulp, which holds nerves and blood vessels. If deep decay, a crack or an injury lets bacteria reach the pulp, it becomes infected and inflamed. Root canal treatment removes the infected pulp, cleans the inside of the tooth and seals it, so the tooth can stay in your mouth.",
      },

      { type: "h2", id: "symptoms", text: "Signs You May Need One" },
      {
        type: "list",
        items: [
          "Severe toothache, especially when biting or at night.",
          "Lingering sensitivity to hot or cold after the drink is gone.",
          "A tooth that has darkened in colour.",
          "Swelling or tenderness in the gum near a tooth.",
          "A small pimple-like bump on the gum.",
          "A deep cavity or a cracked tooth.",
        ],
      },
      {
        type: "p",
        text: "Sometimes an infected tooth causes no pain at all, which is why regular check-ups and X-rays matter.",
      },

      { type: "h2", id: "procedure", text: "What Happens During Treatment" },
      { type: "h3", text: "1. Examination and X-ray" },
      { type: "p", text: "We check the tooth, take an X-ray and confirm that a root canal is the right option." },
      { type: "h3", text: "2. Numbing the area" },
      { type: "p", text: "Local anaesthesia is given so you stay comfortable throughout." },
      { type: "h3", text: "3. Cleaning the canals" },
      {
        type: "p",
        text: "A small opening is made in the tooth, the infected pulp is removed and the canals are carefully cleaned and shaped.",
      },
      { type: "h3", text: "4. Filling and sealing" },
      { type: "p", text: "The cleaned canals are filled with a safe material and the opening is sealed to keep bacteria out." },
      { type: "h3", text: "5. Crown to protect the tooth" },
      {
        type: "p",
        text: "A tooth that has had a root canal is more brittle, so a crown is usually recommended, especially for back teeth that handle heavy chewing.",
      },
      {
        type: "p",
        text: "Depending on the tooth and the infection, treatment may take one or more visits.",
      },

      { type: "h2", id: "myths", text: "Common Myths, Cleared Up" },
      {
        type: "list",
        items: [
          { term: "\"It is very painful.\"", text: "The pain comes from the infection. Treatment relieves it, and the area is numbed." },
          { term: "\"Pulling the tooth is easier.\"", text: "A natural tooth, kept healthy, usually works better than any replacement." },
          { term: "\"Root canals cause illness.\"", text: "There is no reliable scientific evidence for this. The treatment removes infection." },
          { term: "\"The tooth is dead, so it is useless.\"", text: "The tooth is still held firmly by the surrounding bone and ligaments and can function for years." },
        ],
      },

      { type: "h2", id: "aftercare", text: "Aftercare: Looking After Your Tooth" },
      {
        type: "list",
        items: [
          "Mild soreness for a few days is normal and usually settles with prescribed medicines.",
          "Avoid chewing hard food on that side until the final filling or crown is done.",
          "Do not skip the crown if it has been advised.",
          "Brush and floss as usual and keep your check-up appointments.",
        ],
      },
      {
        type: "note",
        text: "Call the clinic if pain gets worse, swelling develops or your bite feels uneven after treatment.",
      },

      { type: "h2", id: "cost", text: "What Affects the Cost?" },
      {
        type: "p",
        text: "The cost depends on which tooth is treated (front teeth have fewer canals than molars), how many visits are required, whether the tooth was treated before, and the type of crown chosen afterwards. We give you an estimate after examining the tooth.",
      },

      { type: "h2", id: "when-to-visit", text: "Do Not Wait for the Pain to Worsen" },
      {
        type: "p",
        text: "An untreated infection can spread to the bone and surrounding tissues and make treatment more complicated. If you have a toothache that does not settle, see a dentist early. The sooner a tooth is treated, the better its chance of being saved.",
      },
    ],
    faqs: [
      {
        q: "Is a root canal painful?",
        a: "The procedure is done under local anaesthesia, so you should feel little more than pressure. Any soreness afterwards is usually mild.",
      },
      {
        q: "How many visits does it take?",
        a: "It varies with the tooth and the infection. Some teeth are completed in a single visit, others need more.",
      },
      {
        q: "Do I need a crown afterwards?",
        a: "Often, yes, particularly for molars and premolars, because the tooth is weaker after treatment. We will advise you for your particular tooth.",
      },
      {
        q: "Can I eat after a root canal?",
        a: "Once the numbness wears off you can eat, but stay with soft food and avoid chewing on that side until the tooth is fully restored.",
      },
      {
        q: "What if I ignore the infection?",
        a: "It can lead to abscess, swelling, bone loss and eventually loss of the tooth. Early treatment is simpler and gives better results.",
      },
    ],
    cta: {
      title: "Have a Toothache That Will Not Go Away?",
      description:
        "Book a consultation and let us find the cause. Early treatment can save your natural tooth.",
      message: "Hello A-Zee Dental, I have a toothache and would like to book a consultation.",
    },
  },
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

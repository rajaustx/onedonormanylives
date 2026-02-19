export type PressLanguage = "en" | "other";

export interface PressEntry {
  id: string;
  publication: string;
  headline: string;
  date: string;
  language?: PressLanguage;
  image?: string;
  excerpt?: string;
  fullText?: string;
  url?: string;
}

/** Truncate text to approximately maxWords words. */
export function truncateToWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

export const pressEntries: PressEntry[] = [
  {
    id: "indian-express-2026",
    publication: "The Indian Express",
    language: "en",
    headline:
      "She wanted to donate her kidney to a stranger, so this Bengaluru doctor approached the high court",
    date: "2026-02-15",
    image: "/press/article-in-indian-express.png",
    excerpt:
      "The 58-year-old Bengaluru resident and fetal medicine consultant at Manipal Hospital is now recovering at home after successfully donating her kidney to a woman, also in her 50s.",
    url: "https://indianexpress.com/article/legal-news/she-wanted-to-donate-her-kidney-to-a-stranger-so-this-bengaluru-doctor-approached-the-high-court-10532757/",
    fullText: `Thankam Subramonian fought a battle for years before a successful organ transplant. Except, she wasn't the recipient as one would imagine, but a donor to someone she never knew.

The 58-year-old Bengaluru resident and a fetal medicine consultant at Manipal Hospital is now recovering at home after successfully donating her kidney to a woman, also in her 50s.

"This has been a bit of a journey," said her brother, Raj. "She wanted to do this since around 2014, after being inspired by a talk about organ donation at her hospital."

But the road was paved with obstacles since 2016, as she looked at options to donate the organ directly, as opposed to being on a list for postmortem donation. "The vast majority of the family were very concerned and didn't want her to do it at first," said Raj. "It is the lack of awareness… The risk to longevity is less than 1%. She is a very strong-willed person." Eventually, the family came around.

With help from her colleagues, she set out to find a recipient. "The matter went all the way up to the Manipal council. The council interviewed me, our father, and her husband. It is right to do so because of organ trafficking concerns and so on. Unfortunately, two years ago, they said they could not approve it. She was quite flustered," Raj recalled.

Late last year, she approached the Karnataka HC. The Bench, comprising Justice Suraj Govindaraj, acknowledged the relative urgency of the matter, with a family history of diabetes creating a time-bound risk that could make the kidney unviable for donation. The judge ruled on November 25, 2025, "... when she has come forward for donating her kidney of her own free will and volition, being aware of all the aspects relating thereto, her request has to be given due credence and accepted and put in action."

"This is one of the rare cases where the petitioner has approached this court to donate her kidney to any deserving person as an 'altruistic donor' without seeking compensation of any nature," the court noted.

On the day of the procedure, the recipient's family was just a few hospital rooms away and came to express their gratitude. "It was very emotional; we met them, though we did not expect to," Raj said.

Dr Thankam said she hopes her case creates awareness. "The work is still huge… More young people should come forward and also remain healthy enough to donate a kidney. I have not heard of other living donations to unrelated recipients in Karnataka, but overall, the transplant picture in India is dismal. Even among deceased organ donations, the rates are very, very low," she said.`,
  },
  {
    id: "daily-hunt-kannada-2026",
    publication: "Daily Hunt (Vijay Karnataka)",
    language: "other",
    headline:
      "Doctor Donates Kidney to an Unrelated Person After Legal Battle — The Story of Bengaluru's \"Real Hero\"",
    date: "2026-02-15",
    image: "/press/article-in-daily-hunt-kannada.png",
    excerpt:
      "Dr. Thankam donated her kidney to a stranger after winning a legal battle. Her act is described as a powerful example of humanity and service to society.",
    url: "https://dhunt.in/13rkh4",
    fullText: `Doctor Donates Kidney to an Unrelated Person After Legal Battle — The Story of Bengaluru's "Real Hero"

This article reports an unusual incident that took place in Bengaluru city.

A doctor named Dr. Thankam made the decision to donate her kidney to a person she did not know who was in need of it.

To make this donation happen, she had to fight a legal battle because permission was initially not given.

This was the first time such an event was carried out where a doctor donated an organ to a stranger after overcoming legal hurdles.

Finally, after winning the legal fight, the donation was successfully completed.

The article describes her act as a powerful example of humanity and service to society, echoing the spirit of "Vaidyo Narayano Hari" (meaning roughly that a healer stands for the divine).

It also notes that Dr. Thankam's life and actions have given a strong message of inspiration, especially to the younger generation.`,
  },
  {
    id: "toi-2024",
    publication: "Times of India",
    language: "en",
    headline: "Gift of life: Doctor fights legal battle to give kidney to stranger",
    date: "2026",
    image: "/press/article-in-times-of-india.jpg",
    excerpt:
      "The Times of India shared this journey with readers—a reminder that acts of profound generosity can inspire many.",
    fullText: `Bengaluru: For decades, doctors have been seen as life-savers through the care they provide. But a city-based fetal medicine specialist chose to save a life in a deeply personal way—by donating her own kidney to a stranger.

Dr Thankam S first pledged for organ donation in 2014. But as she learned about low conversion rates in deceased donations, she felt compelled to act sooner. "I decided to become a living donor," she said.

She faced a decade of legal hurdles, lack of family support, and repeated rejections by the hospital-based authorisation committee. In June 2025, she filed a case in court to tackle the legal hurdles, and in December 2025, a high court judge directed the hospital-based authorisation committee to give her permission for donation. The committee was directed to identify the top five candidates for donation within five weeks. The first recipient was declared unfit, and the second—a 56-year-old woman—was fit for transplant. Surgery was approved on February 2, and the transplant took place on February 10.

Dr Thankam S, now 50 years old, wants to spread the message about donating a kidney and create awareness, especially among young people, that it is completely safe to donate a kidney to unrelated persons. She believes a doctor doing it would create confidence. Non-related person donation is common in other states, and there is a need to gain momentum in Karnataka.

Her donation was not an isolated act of altruism—she has also served with Doctors Without Borders.`,
  },
  {
    id: "rajasthan-patrika-2026",
    publication: "Rajasthan Patrika",
    language: "other",
    headline:
      "Victory of Humanity: When the hospital committee refused approval, she knocked on the High Court's door. Struggle since 2016, approval granted in 2025",
    date: "2026-02-16",
    image: "/press/article-in-rajasthan-patrika.png",
    excerpt:
      "Doctor fought the system and donated her kidney to a stranger. A Bengaluru doctor chose to donate her kidney to an unknown woman after years of legal and administrative procedures, setting an extraordinary example of courage and kindness.",
    fullText: `Victory of Humanity: When the hospital committee refused approval, she knocked on the High Court's door. Struggle since 2016, approval granted in 2025

Doctor fought the system and donated her kidney to a stranger

Patrika News Network

Bengaluru: Humanity is sometimes tied not by blood relations, but by decisions made from the heart. A Bengaluru doctor, Dr. Subramanian (58), proved this. While most people donate organs to relatives, she chose to donate her kidney to a stranger. For this, she had to battle the system and even approach the High Court.

After years of legal and administrative procedures, she finally won approval and donated her kidney to an unknown woman, setting an example of humanity. According to her, this decision was not taken under pressure, but purely out of personal will and compassion. This is not just a medical procedure, but an extraordinary example of courage and kindness to save another life.

She stood firm even after retirement

In 2016, she began the process of donating her kidney as a living donor. Seeing the risk involved in a non-relative donation, the hospital committee conducted extensive questioning of her and her family. Despite this, the committee refused approval. It was discouraging, but she did not give up.

Years-long struggle, but hope never faded

Dr. Subramanian works as a fetal medicine consultant at a private hospital in the city. She decided to donate after attending a lecture about organ donation in 2014. However, fulfilling that resolve was not easy. Family concerns, administrative processes, and legal hurdles repeatedly blocked her path. Still, she never changed her decision.

Court calls it a rare and inspiring case

She approached the Karnataka High Court. Justice Suraj Govindaraj's bench clarified on 25 November 2025 that if a person wants to donate voluntarily without any financial benefit, their wish should be respected.

Emotional meeting became inspiration

After the transplant, the recipient's family met Dr. Subramanian and expressed deep gratitude. It was an emotional moment for both families. Despite having no personal relationship, the meeting became a symbol of humanity's deep bond.

Message to society about organ donation

Dr. Subramanian said this step would inspire people to donate organs. She noted that organ donation rates in India are still low and more people should come forward. A healthy person can give someone else a second chance at life through donation.

A stranger receives a new life

After court approval, she donated her kidney to a nearly 50-year-old unknown woman, giving her a new life. The transplant was successful. Both are healthy after surgery. The court said such acts of compassion deserve full respect and called it a rare and inspiring case.`,
  },
  {
    id: "mathrubhumi-news-2026",
    publication: "Mathrubhumi News (Malayalam)",
    language: "other",
    headline: "Donated kidney through legal battle",
    date: "2026-02-18",
    image: "/press/mathrubhumi-news-malayalam.png",
    excerpt:
      "It's not that I expect to change the world because of this one action... but if can help to even spark a conversation about organ donorship, I would feel I have succeeded. If we realize that we do not need our organs after death, and that it could end up saving/enhancing the lives of 5-7 other people, that would be a great thing...",
    fullText: `It's not that I expect to change the world because of this one action... but if can help to even spark a conversation about organ donorship, I would feel I have succeeded. If we realize that we do not need our organs after death, and that it could end up saving/enhancing the lives of 5-7 other people, that would be a great thing...`,
    url: "https://www.youtube.com/watch?v=wVGek12mTOk",
  },
  {
    id: "happiest-health-2026",
    publication: "Happiest Health",
    language: "en",
    headline: "Bangalore doctor creates history, donates kidney to a stranger",
    date: "2026-02-17",
    image: "/press/happiest-health-bangalore-doctor.png",
    excerpt:
      "Dr Thankam Subramonian says, she wanted to spread a message that kidney donation is safe to end the stigma around it.",
    url: "https://www.happiesthealth.com/articles/kidney-health/bangalore-doctor-donates-kidney-to-a-stranger",
  },
  {
    id: "vijay-karnataka-2026",
    publication: "Vijay Karnataka",
    language: "other",
    headline: "Aparichita Mahilege Motte Pinda Dana (An anonymous woman donates a kidney)",
    date: "2026-02-18",
    image: "/press/prajavani-kidney-donation.png",
    excerpt:
      "A kidney donation that changed a stranger's life. A woman from Rajasthan living in Bengaluru has donated her kidney to a person she did not know, giving them a new lease on life.",
    fullText: `A kidney donation that changed a stranger's life

Bengaluru:
A woman from Rajasthan living in Bengaluru has donated her kidney to a person she did not know, giving them a new lease on life.

The donor, Dr. Thankam (56), works in the healthcare sector. Deeply moved by the suffering of patients and aware of the critical shortage of organ donors, she voluntarily decided to donate one of her kidneys to save a life.

She was inspired after learning about the large number of patients waiting for transplants. According to her, thousands remain on waiting lists due to the shortage of donors. Seeing this reality firsthand strengthened her resolve to help.

Overcoming hurdles

Though her family initially expressed concern, she stood firm in her decision. After undergoing medical evaluation and completing all legal formalities, the transplant was successfully carried out. Doctors confirmed that both the donor and the recipient are recovering well.

Dr. Thankam stated that the decision was not impulsive. She had thought about it for years before finally acting. She believes that if one has the ability to save a life, one should not hesitate.

Kidney Transplants in Bengaluru

A table in the article provides data on kidney transplants in Bengaluru over the past few years:

Year    Donors  Registered  Transplants
2022    151     415         348
2023    178     469         393
2024    162     457         339
2025    198     564         397
2026    12      32          14

The article notes that while registrations for kidney transplants have increased, the number of donors remains insufficient compared to the demand.

Increasing Demand

Medical experts emphasize that the demand for kidney transplants continues to rise due to lifestyle diseases, hypertension, and diabetes. They stress the need for greater awareness about organ donation.

Dr. Thankam hopes her act will inspire others to consider organ donation. She says saving even one life brings immense satisfaction and meaning.`,
  },
  {
    id: "prajavani-2026",
    publication: "Prajavani",
    language: "other",
    headline: "Kidney Donation: Donating to an Unknown Woman",
    date: "2026-02-19",
    image: "/press/prajavani-kidney-donation-web.png",
    excerpt:
      "With permission from the High Court, doctor Dr. Thankam S. has donated a living kidney to a woman she did not know and is now encouraging awareness about organ donation.",
    fullText: `Doctor donates after High Court approval, speaks about raising awareness

BENGALURU:
With permission from the High Court, doctor Dr. Thankam S. has donated a living kidney to a woman she did not know and is now encouraging awareness about organ donation.

Dr. Thankam said:

"The kidney donation was safe, and young people especially should be made aware about it. That is why I pursued the legal process and donated my kidney to a stranger."

She made the donation following court approval after a legal process. The article reports that she has been trying to promote understanding about organ donation and the safety of kidney donation generally.`,
    url: "https://www.prajavani.net/district/bengaluru-city/live-kidney-donation-to-unknown-woman-bengaluru-3788234",
  },
  {
    id: "mathrubhumi-print-2026",
    publication: "Mathrubhumi (Malayalam)",
    language: "other",
    headline: "\"A heart that gave life\" A Malayali doctor who became a model of selflessness",
    date: "2026-02-18",
    image: "/press/mathrubhumi-print-malayalam.png",
    excerpt:
      "Dr. Thankam Subramonian is not someone who seeks publicity. She is a doctor who quietly chose to give part of her life so another person could live. While working in the medical field and witnessing suffering closely, she felt a deep responsibility toward humanity.",
    fullText: `Dr. Thankam Subramonian is not someone who seeks publicity. She is a doctor who quietly chose to give part of her life so another person could live.

While working in the medical field and witnessing suffering closely, she felt a deep responsibility toward humanity. That sense of compassion eventually led her to donate one of her kidneys to a patient in need. Her decision was not impulsive. It came after careful thought, discussions, and overcoming many emotional and legal hurdles.

Even family opposition and procedural complications did not weaken her resolve. She believed that if she had the ability to save a life, she should act. Her courage reflects the humanitarian values she grew up with. Her grandfather was a freedom fighter. Her mother was known for her compassion and service to others. Those influences shaped her outlook.

By donating her kidney, Dr. Thanka demonstrated that true service to humanity goes beyond words. Her act is described as revolutionary in its compassion. The writer says they had never seen God in person, but in witnessing this act, they felt they had seen divinity through her.

Today, she stands as a shining example of sacrifice, courage, and kindness. Her story is being celebrated as a reminder that humanity is alive in those who choose to act for others.`,
  },
  {
    id: "newsfirst-kannada-2026",
    publication: "NewsFirst Kannada",
    language: "other",
    headline: "A doctor who donated her kidney to a stranger… this is a rare story.",
    date: "2026-02-17",
    image: "/press/newsfirst-kannada-interview.png",
    excerpt:
      "In this day and age when most people hesitate to part with money to help people or even close relatives... this is a story of a doctor in Bangalore who's become the first person in Karnataka to voluntarily donate a kidney to a complete stranger with no expectation of monetary reward. This act is called non-directed donation. It is legal, voluntary, and one of the most powerful forms of generosity in modern medicine.",
    url: "https://www.youtube.com/watch?v=s1OMtkinXcw",
  },
  {
    id: "dhinathanthi-2026",
    publication: "Dhinathanthi (Tamil)",
    language: "other",
    headline: "A woman doctor donates a kidney to a 56-year-old woman in need",
    date: "2026",
    image: "/press/article-in-dhinathanthi-tamil.jpeg",
    excerpt:
      "Dr. Thangam voluntarily donated her kidney to a 56-year-old woman in need of a transplant. Both donor and recipient are recovering well.",
    fullText: `A woman doctor donates a kidney to a 56-year-old woman in need

A woman doctor named Thangam, who is working in the medical field, has donated her kidney to a 56-year-old woman who needed a transplant. This act has drawn widespread appreciation.

The recipient was suffering from kidney failure and was undergoing dialysis. Doctors advised that only a transplant could save her life. However, no matching donor was available within her family.

At that time, Dr. Thangam voluntarily stepped forward and expressed her wish to donate her kidney. Since she was not related to the patient, legal permission was required. After completing the necessary approvals and procedures, the transplant surgery was successfully performed.

Both the donor and recipient are reported to be recovering well.

Dr. Thangam explained that she made this decision purely out of humanitarian concern. She said that organ donation is a way to give life to another human being and urged people to come forward for organ donation.

In January 2025, the transplant process moved forward after official clearance. The surgery was carried out under the supervision of a medical team. Following the procedure, the 56-year-old woman's health improved steadily.

Doctors involved in the surgery praised the courage and generosity shown by Dr. Thangam. Hospital authorities stated that such acts of selfless donation are rare and should inspire society.

The transplant was completed successfully after several hours of surgery, and both women are now stable.`,
  },
];

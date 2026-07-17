// Demo testimonials — realistic voices of typical Patna customers.
// Replace with real Google reviews as they come in.

export interface Testimonial {
  name: string;
  role: string;
  area: string;
  text: string;
  rating: number;
  product: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Dr. Anjali Sinha",
    role: "Physician",
    area: "Kankarbagh",
    text: "Prescription pads aur letterhead pichhle teen saal se yahin ban rahe hain. Paper quality achhi hai, likhne mein smooth — aur reorder ek phone par ho jata hai.",
    rating: 5,
    product: "Prescription pads",
  },
  {
    name: "Rakesh Gupta",
    role: "Restaurant Owner",
    area: "Boring Road",
    text: "Menu cards, pamphlets aur bill books — sab Likhavat se. Opening ke time 10,000 pamphlets sirf do din mein de diye the. Rate bhi market se behtar.",
    rating: 5,
    product: "Pamphlets & menus",
  },
  {
    name: "Neha Verma",
    role: "Event Planner",
    area: "Patna",
    text: "Shaadi ho ya corporate event, inka flex aur standee kaam ekdum time par milta hai. Ek baar raat 9 baje order diya, subah 8 baje banner ready tha.",
    rating: 5,
    product: "Flex & standees",
  },
  {
    name: "Sunil Kumar",
    role: "School Principal",
    area: "Danapur",
    text: "School ke calendar, certificates, ID cards aur admission brochures — quality consistent hai aur GST bill ke saath proper billing milti hai.",
    rating: 5,
    product: "School stationery",
  },
  {
    name: "Pooja Agarwal",
    role: "Boutique Owner",
    area: "Patliputra Colony",
    text: "Mere boutique ke paper bags aur tags itne achhe bane ki customers pooch kar jaate hain kahan se banwaye. Packaging se hi branding ho gayi.",
    rating: 5,
    product: "Paper bags & tags",
  },
  {
    name: "Manoj Yadav",
    role: "Campaign Coordinator",
    area: "Patna",
    text: "Chunav ke time raat-din kaam karke hazaron poster, flex aur t-shirts diye — ek din ki bhi deri nahi. Bharose ka naam hai Likhavat.",
    rating: 5,
    product: "Posters & tees",
  },
];

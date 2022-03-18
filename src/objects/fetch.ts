import MasterFetch from "@/functions/MasterFetch";

const fetcher = new MasterFetch(
  (res) => res.json(),
  {},
  true,
  "default",
  "follow",
  "no-referrer-when-downgrade",
  "cors",
  "omit"
);

export default fetcher;

export type ProfileSchema = Record<
  "name" | "nickname" | "email" | "divisa" | "preferred_cryptocurrency",
  string
> & {
  capital: number;
};

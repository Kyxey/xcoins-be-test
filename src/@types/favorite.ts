export type FavoriteSchema = Record<"profile_id" | "name", string> & {
  favorites: string[];
};

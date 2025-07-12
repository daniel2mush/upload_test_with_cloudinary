import { date, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const uploadTable = pgTable("upload", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  fileURL: text("file_url").notNull(),
  thumbnailURL: text("thumbnail_url"),
  fileId: text("file_id").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

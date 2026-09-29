import { pgTable, text, timestamp, uuid, integer, unique } from "drizzle-orm/pg-core";

// Kullanıcılar (SaaS sahipleri veya post atanlar)
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Projeler (Her kullanıcının oluşturduğu board'lar)
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  ownerId: uuid("owner_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Geri bildirimler / Feature request'ler
export const posts = pgTable("posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status", { enum: ["open", "planned", "in-progress", "completed"] }).default("open").notNull(),
  upvoteCount: integer("upvote_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Oylar (Mükerrer oy engelleme: 1 kullanıcı/ip aynı post'a 1 oy verebilir)
export const votes = pgTable(
  "votes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id").references(() => posts.id, { onDelete: "cascade" }).notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    fingerprint: text("fingerprint"), // Giriş yapmamış kullanıcılar için ip/fingerprint
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    unique("post_user_vote_unique").on(t.postId, t.userId),
  ]
);


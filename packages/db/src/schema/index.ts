import { pgTable, pgEnum, text, timestamp, uuid, index, integer, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* ENUM DEFINITIONS */

export const postStatusEnum = pgEnum("post_status", [
  "open", // feedback send by the author
  "planned", // accepted, will work on it 
  "in_progress", // working on it
  "completed", // developed
  "rejected" // developer rejected the feature request
])

/* TABLE DEFINITIONS */

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text('description'),
  ownerId: uuid("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const posts = pgTable(
  "posts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
    authorId: uuid("author_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    status: postStatusEnum("status").default("open").notNull(),
    upvoteCount: integer("upvote_count").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [
    index("posts_project_id_idx").on(table.projectId) // for "get posts of the project 1234<id>"
  ]
);

export const votes = pgTable(
  "votes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id").references(() => posts.id, { onDelete: "cascade" }).notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    unique("post_user_vote_unique").on(table.postId, table.userId),
  ]
);

/* RELATIONS */

// USERS RELATIONS
// Bir kullanıcının sahip olabileceği alt varlıklar:
// - projects: Kullanıcının oluşturduğu / sahibi olduğu projeler (1-N)
// - posts: Kullanıcının açtığı feature request / feedback maddeleri (1-N)
// - votes: Kullanıcının postlara verdiği oylar (1-N)
export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
  posts: many(posts),
  votes: many(votes),
}));

// PROJECTS RELATIONS
// Bir projenin bağlı olduğu ve içerdiği varlıklar:
// - owner: Projenin sahibi olan kullanıcı (N-1 -> projects.ownerId -> users.id)
// - posts: Bu proje panosunda açılmış olan feedback/post kayıtları (1-N)
export const projectsRelations = relations(projects, ({ one, many }) => ({
  owner: one(users, {
    fields: [projects.ownerId],
    references: [users.id],
  }),
  posts: many(posts),
}));

// POSTS RELATIONS
// Bir feedback postunun ilişkili olduğu üst ve alt varlıklar:
// - project: Postun ait olduğu proje panosu (N-1 -> posts.projectId -> projects.id)
// - author: Postu oluşturan kullanıcı (N-1 -> posts.authorId -> users.id)
// - votes: Posta kullanıcılar tarafından verilen oylar (1-N)
export const postsRelations = relations(posts, ({ one, many }) => ({
  project: one(projects, {
    fields: [posts.projectId],
    references: [projects.id],
  }),
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  votes: many(votes),
}));

// VOTES RELATIONS (Join Table / Pivot)
// Kullanıcı ve post arasındaki çoktan çoğa (N-M) oy ilişkisi:
// - user: Oyu kullanan kullanıcı (N-1 -> votes.userId -> users.id)
// - post: Oyun verildiği feedback postu (N-1 -> votes.postId -> posts.id)
export const votesRelations = relations(votes, ({ one }) => ({
  user: one(users, {
    fields: [votes.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [votes.postId],
    references: [posts.id],
  }),
}));

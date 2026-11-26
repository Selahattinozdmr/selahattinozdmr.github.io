// Locale-independent project data. Order here drives the rendered order.
export type ProjectMeta = {
  id: string;
  stack: string[];
  url?: string;
  image?: string;
  featured: boolean;
};

export const projectMeta: ProjectMeta[] = [
  {
    id: "autosuchen24",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    url: "https://autosuchen24.ch",
    image: "/images/autosuchen24.jpg",
    featured: true,
  },
  {
    id: "takasgo",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    url: "https://www.takasgoglobal.com.tr/",
    image: "/images/takasgo.jpg",
    featured: true,
  },
  {
    id: "mutfix",
    stack: ["Next.js", "Node.js", "PostgreSQL", "RBAC"],
    image: "/images/mutfix.jpg",
    featured: true,
  },
  {
    id: "nerdeyemek",
    stack: ["Next.js", "React Native", "Node.js"],
    url: "https://nerdeyemek.com",
    image: "/images/nerdeyemek.jpg",
    featured: false,
  },
  {
    id: "quiz",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    url: "https://dergipark.org.tr/tr/pub/bilmes/article/1613874",
    image: "/images/quiz.jpg",
    featured: false,
  },
];

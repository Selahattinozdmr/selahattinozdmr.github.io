// Locale-independent project data. Order here drives the rendered order.
export type ProjectMeta = {
  id: string;
  stack: string[];
  url?: string;
  image?: string;
  imageMobile?: string;
  featured: boolean;
};

export const projectMeta: ProjectMeta[] = [
  {
    id: "autosuchen24",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    url: "https://autosuchen24.ch",
    image: "/images/work/autosuchen24.webp",
    imageMobile: "/images/work/autosuchen24-mobile.webp",
    featured: true,
  },
  {
    id: "takasgo",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    url: "https://www.takasgoglobal.com.tr/",
    image: "/images/work/takasgo.webp",
    imageMobile: "/images/work/takasgo-mobile.webp",
    featured: true,
  },
  {
    id: "mutfix",
    stack: ["Next.js", "Node.js", "PostgreSQL", "RBAC"],
    featured: true,
  },
  {
    id: "nerdeyemek",
    stack: ["Next.js", "React Native", "Node.js"],
    url: "https://nerdeyemek.com",
    image: "/images/work/nerdeyemek.webp",
    imageMobile: "/images/work/nerdeyemek-mobile.webp",
    featured: false,
  },
  {
    id: "quiz",
    stack: ["Next.js", "Node.js", "PostgreSQL"],
    url: "https://dergipark.org.tr/tr/pub/bilmes/article/1613874",
    featured: false,
  },
];

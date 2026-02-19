export type ProjectCategory = "App" | "Clone" | "Publishing" | "Tool";

export interface Project {
  id: number;
  title: string;
  url: string | null;
  category: ProjectCategory;
  description: string;
  tech: string[];
  image: string;
  isPrivate?: boolean;
  videoUrl?: string;
}

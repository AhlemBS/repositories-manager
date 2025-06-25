export interface Repository {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  language: string | null;
  stargazers_count: number;
}

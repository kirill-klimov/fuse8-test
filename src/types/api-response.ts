export interface JokeItem {
  categories: string[];
  id: string;
  updated_at: string;
  url: string;
  value: string;
}

export interface JokesResponse {
  total: number;
  result: JokeItem[];
}

export const initState: JokesResponse = {
  result: [],
  total: 0
};
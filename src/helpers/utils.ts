import axios from "axios";
import { JokesResponse } from "../types/api-response";



export async function getJokes(args: { queryKey: Array<any> }): Promise<JokesResponse> {
  const query = args.queryKey[1];
  if (query.length < 3) {
    return {
      result: [],
      total: 0
    };
  };
  const response = await axios(`https://api.chucknorris.io/jokes/search?query=${query}`);
  return response.data;
}

export function formatDateStr(date: string) {
  if (typeof date !== 'string') return 'No date';
  return date.slice(0, 10);
}

export function getCurrentRange(page: number, offset: number): Array<number> {
  const start = (page - 1) * offset;
  const end = start + offset;
  return [start, end];
}
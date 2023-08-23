export interface ICreateBody {
  amount: number;
  source: string;
}

export interface IUpdateBody {
  amount?: number;
  source?: string;
}

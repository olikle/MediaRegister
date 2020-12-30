// records.interface.ts

export interface Records {
  [key: number]: Record;
}
export interface Record {
    id?: number;
    title: string;
    description: string;
  }

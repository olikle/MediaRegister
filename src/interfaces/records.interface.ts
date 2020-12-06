// records.interface.ts

export interface Records {
  [key: number]: Record;
}
export interface Record {
    id: number;
    name: string;
    description: string;
  }

export class Quote {
  public quoteID: number;
  public quoteType: string;
  public contact: string;
  public task: string;
  public dueDate: string;
  public taskType: string;
  public ifCompleted: boolean;
  public quoteNumber: number;

  constructor(init?: Partial<Quote>) {
    Object.assign(this, init);
  }
}

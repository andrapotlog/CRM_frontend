export interface Payment {
  payment_id?: number;
  recipientName: string;
  recipientAccountNumber: string;
  billNumber: string;
  amount: number;
  description: string;
  dateAndTime: string;
  card_number: string;
  expiration: string;
  cardType: string;
  ownerName: string;
  invoiceId?: string;
  payerUserId: number;
}

export interface CardInformation {
  card_id?: number;
  card_number: string;
  expiration: string;
  cardType: string;
  ownerName: string;
  savedByUserId: number;
}

export interface Template {
  template_id?: number;
  recipientName: string;
  recipientAccountNumber: string;
  templateName: string;
  createdByUserId?: number;
}

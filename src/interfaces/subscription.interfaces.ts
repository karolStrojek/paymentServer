export interface ISubscription {
  providerId: string;
  subscriptionStatus: "active" | "unactive";
  createdAt?: Date;
  endsAt?: Date;
  updatedAt?: Date;
}

export interface ISubscriptionWebsocket {
  id: string;
  attributes: {
    user_email: string;
    created_at: Date | null;
    updated_at: Date | null;
    ends_at: Date | null;
  };
}

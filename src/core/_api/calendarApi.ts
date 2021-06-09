import { Errors } from "../_enum/Errors";
import { IEventCreate } from "../_types/eventCreate";
import { IEventResponse } from "../_types/eventResponse";
import { IGuestCreate } from "../_types/guestCreate";
import { IGuestResponse } from "../_types/guestResponse";
import { ISubscriptionCreate } from "../_types/subscriptionCreate";
import { ISubscriptionResponse } from "../_types/subscriptionResponse";

class CalendarApi {
  private path = "calendar";

  async createActivityEvent(event: IEventCreate): Promise<IEventResponse> {
    const res = await fetch(`${process.env.REACT_APP_BASE_API}/${this.path}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (res.status !== 201) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async addSingleEvent(event: IEventCreate): Promise<IEventResponse> {
    const res = await fetch(`${process.env.REACT_APP_BASE_API}/${this.path}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (res.status !== 201) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async removeEvent(eventId: string) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.path}/` + eventId,
      {
        method: "delete",
      }
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async getComingEvents(): Promise<IEventResponse[]> {
    const res = await fetch(`${process.env.REACT_APP_BASE_API}/${this.path}`);
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async createSubscription(
    subscription: ISubscriptionCreate
  ): Promise<ISubscriptionResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.path}/subscription`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }
    );
    if (res.status !== 201) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async removeSubscription(id: string) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.path}/subscription/` + id,
      {
        method: "delete",
      }
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async getAllSubscriptions(): Promise<ISubscriptionResponse[]> {
    const res = await fetch(`${process.env.REACT_APP_BASE_API}/${this.path}/subscription`);
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async getSubscriptionValidate(id: string): Promise<IEventResponse[]> {
    const res = await fetch(`${process.env.REACT_APP_BASE_API}/${this.path}/subscription/${id}/validate`);
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async createGuest(guest: IGuestCreate): Promise<IGuestResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.path}/guest`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(guest),
      }
    );
    if (res.status !== 201) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }
}

export default CalendarApi;

import { Errors } from "../_enum/Errors";
import { IActivityCreate } from "../_types/activityCreate";
import { IActivityResponse } from "../_types/activityResponse";
import { IEventRequest } from "../_types/eventRequest";
import { IEventResponse } from "../_types/eventResponse";
import { IGuestResponse } from "../_types/guestResponse";
import { ISubscriptionGuest } from "../_types/subscription-guest";
import { ISubscriptionUser } from "../_types/subscription-user";
import { IUserResponse } from "../_types/userResponse";

class ActivityApi {
  private activityPath = "activity";
  private calendarPath = "calendar";
  private subscriptionUserPath = "calendar/user/subscription";
  private subscriptionGuestPath = "calendar/guest/subscription";

  async getAllActivities(): Promise<IActivityResponse[]> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.activityPath}`
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async addActivity(activity: IActivityCreate): Promise<IActivityResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.activityPath}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      }
    );
    if (res.status !== 201) {
      throw new Error(Errors.CREATE_ENTITY);
    }
    return res.json();
  }

  async removeActivity(activityId: string) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.activityPath}/` + activityId,
      {
        method: "delete",
      }
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async createEvent(event: IEventRequest): Promise<IEventResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.calendarPath}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      }
    );
    if (res.status !== 201) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async getComingEvents(): Promise<IEventResponse[]> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.calendarPath}`
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async applySubscriptionUser(
    subscription: ISubscriptionUser
  ): Promise<IUserResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.subscriptionUserPath}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      }
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    return res.json();
  }

  async applySubscriptionGuest(
    subscription: ISubscriptionGuest
  ): Promise<IGuestResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.subscriptionGuestPath}`,
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
}

export default ActivityApi;

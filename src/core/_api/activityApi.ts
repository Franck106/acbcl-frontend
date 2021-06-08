import { Errors } from "../_enum/Errors";
import { IActivityCreate } from "../_types/activityCreate";
import { IActivityResponse } from "../_types/activityResponse";

class ActivityApi {
  private activityPath = "activity";

  async getAllActivities(): Promise<IActivityResponse[]> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.activityPath}`
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    const activities: IActivityResponse[] = await res.json();

    return activities.map((activity: IActivityResponse) => {
      if (activity.photos.length === 0) {
        activity.photos.push({
          url: "images/new-logo.png",
          title: "default image",
        });
      }
      return activity;
    });
  }

  async getActivityById(id: string): Promise<IActivityResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.activityPath}/` + id
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
    }
    const activity: IActivityResponse = await res.json();

    if (activity.photos.length === 0) {
      activity.photos.push({
        url: "images/new-logo.png",
        title: "default image",
      });
    }
    return activity;
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

  async updateActivity(
    activity: IActivityResponse
  ): Promise<IActivityResponse> {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.activityPath}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
      }
    );
    if (res.status !== 200) {
      throw new Error(Errors.GENERIC);
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

  
}

export default ActivityApi;

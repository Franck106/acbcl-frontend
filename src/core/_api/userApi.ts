import { format } from "date-fns";

import { Errors } from "../_enum/Errors";
import { ICredentials } from "../_types/credentials";
import { IUserCreate } from "../_types/userCreate";
import { IUserResponse } from "../_types/userResponse";

class UserApi {
  private path = "auth";

  public async login(credentials: ICredentials) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.path}/login`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    if (res.status !== 200) {
      throw new Error(Errors.CREDENTIALS);
    }
    const data = await res.json();
    data.birthDate = data.birthDate
      ? format(new Date(data.birthDate), "dd/MM/yyyy")
      : null;
    return data;
  }

  public async getUserBytoken(): Promise<IUserResponse> {
    const token = localStorage.getItem("TOKEN");
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.path}/me`,
      {
        method: "get",
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (res.status !== 200) {
      throw new Error(Errors.TOKEN);
    }
    const data = await res.json();
    data.birthDate = data.birthDate
      ? format(new Date(data.birthDate), "dd/MM/yyyy")
      : null;
    return data;
  }

  public async createUser(user: IUserCreate) {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_API}/${this.path}/register`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (res.status !== 201) {
      throw new Error(Errors.CREATE_USER);
    }
    const data = await res.json();
    data.birthDate = data.birthDate
      ? format(new Date(data.birthDate), "dd/MM/yyyy")
      : null;
    return data;
  }
}

export default UserApi;

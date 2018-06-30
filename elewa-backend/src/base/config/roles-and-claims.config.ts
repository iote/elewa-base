import { Role } from "../../modules/auth/model/interfaces/role.interface";

export const userRole = "user";
export const adminRole = "admin";

export const roles: Role[] = [
  {
    name: "eta",
    slug: userRole,
    claims: ["claim1", "claim2"]
  },
  {
    name: "admin",
    slug: adminRole,
    claims: ["admin-claim", "claim1", "claim2"]
  }
];
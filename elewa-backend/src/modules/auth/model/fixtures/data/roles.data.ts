import { Role } from '../../interfaces/role.interface';
import { ObjectId } from 'bson';
import { studentRole, teacherRole, adminRole } from '../../roles.const';

export const roles: Role[] = [
  {
    name: "Student",
    slug: studentRole,
    claims: ["blocks", "curriculum", "user", "learn"]
  },
  {
    name: "Teacher",
    slug: teacherRole,
    claims: ["blocks", "curriculum", "user", "learn", "teach"]
  },
  {
    name: "Admin",
    slug: adminRole,
    claims: ["blocks", "curriculum", "user", "learn", "teach", "manage"]
  }
];
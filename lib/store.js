"use client";

/**
 * Restaurant Depot mock data layer.
 *
 * This is a presentation-only stand-in for a real backend and database.
 * Everything lives in localStorage so the registration, approval,
 * account, checkout, and admin flows can be demonstrated without
 * standing up backend infrastructure.
 */

const USERS_KEY = "rd_users";
const SESSION_KEY = "rd_session";

const SEED_USERS = [
  {
    id: "admin-1",
    role: "admin",
    email: "admin@restaurantdepot.com",
    password: "admin123",
    businessName: "Restaurant Depot Staff",
    contactName: "House Admin",
    status: "approved",
    appliedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: "member-demo",
    role: "member",
    email: "member@demo.com",
    password: "member123",
    businessName: "Sunset Bistro",
    contactName: "Dana Reyes",
    phone: "555-0101",
    addressPhone: "555-0101",
    address: "125 Market Street",
    city: "Houston",
    state: "TX",
    zipCode: "77002",
    additionalAddresses: [],
    paymentMethod: "check",
    businessType: "Restaurant",
    status: "approved",
    appliedAt: "2026-05-14T00:00:00.000Z",
  },
];

function createAddressId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `address-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function normalizeAddress(address = {}) {
  return {
    id: address.id || createAddressId(),
    label: address.label || "",
    name: address.name || "",
    street: address.street || "",
    city: address.city || "",
    state: address.state || "",
    zipCode: address.zipCode || "",
    phone: address.phone || "",
  };
}

function normalizeUser(user) {
  return {
    ...user,
    additionalAddresses: Array.isArray(
      user.additionalAddresses
    )
      ? user.additionalAddresses.map(normalizeAddress)
      : [],
  };
}

function readUsers() {
  if (typeof window === "undefined") {
    return SEED_USERS.map(normalizeUser);
  }

  const rawUsers =
    window.localStorage.getItem(USERS_KEY);

  if (!rawUsers) {
    const initialUsers =
      SEED_USERS.map(normalizeUser);

    window.localStorage.setItem(
      USERS_KEY,
      JSON.stringify(initialUsers)
    );

    return initialUsers;
  }

  try {
    const parsedUsers = JSON.parse(rawUsers);

    if (!Array.isArray(parsedUsers)) {
      throw new Error(
        "Stored users value is not an array."
      );
    }

    const normalizedUsers =
      parsedUsers.map(normalizeUser);

    window.localStorage.setItem(
      USERS_KEY,
      JSON.stringify(normalizedUsers)
    );

    return normalizedUsers;
  } catch (error) {
    console.error(
      "Unable to read stored users:",
      error
    );

    const initialUsers =
      SEED_USERS.map(normalizeUser);

    window.localStorage.setItem(
      USERS_KEY,
      JSON.stringify(initialUsers)
    );

    return initialUsers;
  }
}

function writeUsers(users) {
  if (typeof window === "undefined") return;

  const normalizedUsers =
    users.map(normalizeUser);

  window.localStorage.setItem(
    USERS_KEY,
    JSON.stringify(normalizedUsers)
  );
}

export function getUsers() {
  return readUsers();
}

export function getApplications() {
  return readUsers().filter(
    (user) => user.role === "member"
  );
}

export function submitApplication(fields) {
  const users = readUsers();

  const normalizedEmail =
    fields.email.trim().toLowerCase();

  const existingUser = users.find(
    (user) =>
      user.email?.trim().toLowerCase() ===
      normalizedEmail
  );

  if (existingUser) {
    throw new Error(
      "An account with that email already exists."
    );
  }

  const newUser = normalizeUser({
    id: `member-${Date.now()}`,
    role: "member",
    status: "pending",
    appliedAt: new Date().toISOString(),
    ...fields,
    email: fields.email.trim(),
  });

  writeUsers([...users, newUser]);
  setSession(newUser.id);

  return newUser;
}

export function approveUser(id) {
  const users = readUsers().map((user) =>
    user.id === id
      ? {
          ...user,
          status: "approved",
          reviewedAt: new Date().toISOString(),
        }
      : user
  );

  writeUsers(users);
}

export function denyUser(id) {
  const users = readUsers().map((user) =>
    user.id === id
      ? {
          ...user,
          status: "denied",
          reviewedAt: new Date().toISOString(),
        }
      : user
  );

  writeUsers(users);
}

export function login(email, password) {
  const normalizedEmail =
    email.trim().toLowerCase();

  const users = readUsers();

  const user = users.find(
    (candidate) =>
      candidate.email?.trim().toLowerCase() ===
        normalizedEmail &&
      candidate.password === password
  );

  if (!user) {
    throw new Error(
      "Incorrect email or password."
    );
  }

  setSession(user.id);

  return user;
}

export function logout() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(SESSION_KEY);
}

function setSession(userId) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    SESSION_KEY,
    userId
  );
}

export function getCurrentUser() {
  if (typeof window === "undefined") {
    return null;
  }

  const currentUserId =
    window.localStorage.getItem(SESSION_KEY);

  if (!currentUserId) {
    return null;
  }

  return (
    readUsers().find(
      (user) => user.id === currentUserId
    ) || null
  );
}

export function updateUserProfile(fields) {
  if (typeof window === "undefined") {
    return null;
  }

  const currentUserId =
    window.localStorage.getItem(SESSION_KEY);

  if (!currentUserId) {
    throw new Error("Not logged in.");
  }

  const users = readUsers();

  const userIndex = users.findIndex(
    (user) => user.id === currentUserId
  );

  if (userIndex === -1) {
    throw new Error("User not found.");
  }

  const existingUser = users[userIndex];

  const updatedUser = normalizeUser({
    ...existingUser,
    ...fields,
    additionalAddresses: Array.isArray(
      fields.additionalAddresses
    )
      ? fields.additionalAddresses
      : existingUser.additionalAddresses,
    updatedAt: new Date().toISOString(),
  });

  users[userIndex] = updatedUser;
  writeUsers(users);

  return updatedUser;
}

export function getAdmins() {
  return readUsers().filter(
    (user) => user.role === "admin"
  );
}

export function addAdminEmployee({
  email,
  password,
  contactName,
}) {
  const users = readUsers();
  const normalizedEmail =
    email.trim().toLowerCase();

  const existingUser = users.find(
    (user) =>
      user.email?.trim().toLowerCase() ===
      normalizedEmail
  );

  if (existingUser) {
    throw new Error(
      "An account with that email already exists."
    );
  }

  const newAdmin = normalizeUser({
    id: `admin-${Date.now()}`,
    role: "admin",
    email: email.trim(),
    password,
    contactName:
      contactName.trim() || email.trim(),
    status: "approved",
    appliedAt: new Date().toISOString(),
  });

  writeUsers([...users, newAdmin]);

  return newAdmin;
}

export function removeAdmin(id) {
  const users = readUsers();
  const currentUserId =
    typeof window !== "undefined"
      ? window.localStorage.getItem(
          SESSION_KEY
        )
      : null;

  if (id === currentUserId) {
    throw new Error(
      "You cannot remove your own admin account."
    );
  }

  const updatedUsers = users.filter(
    (user) => user.id !== id
  );

  writeUsers(updatedUsers);
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  getAdmins,
  addAdminEmployee,
  removeAdmin,
} from "@/lib/store";

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

function normalizeAdditionalAddresses(addresses = []) {
  if (!Array.isArray(addresses)) return [];

  return addresses.map((address) => ({
    id: address.id || createAddressId(),
    label: address.label || "",
    name: address.name || "",
    street: address.street || "",
    city: address.city || "",
    state: address.state || "",
    zipCode: address.zipCode || "",
    phone: address.phone || "",
  }));
}

export default function AccountPage() {
  const {
    user,
    ready,
    isApprovedMember,
    isAdmin,
    updateUser,
  } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!ready) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (!isApprovedMember && !isAdmin) {
      router.replace("/");
    }
  }, [
    ready,
    user,
    isApprovedMember,
    isAdmin,
    router,
  ]);

  if (!ready || !user) {
    return null;
  }

  return isAdmin ? (
    <AdminAccountView />
  ) : (
    <MemberAccountView
      user={user}
      updateUser={updateUser}
      router={router}
    />
  );
}

function AdminAccountView() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    contactName: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");

  useEffect(() => {
    setAdmins(getAdmins());
  }, []);

  const refresh = () => {
    setAdmins(getAdmins());
  };

  const showMessage = (
    text,
    type = "success"
  ) => {
    setMessage(text);
    setMessageType(type);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleAddAdmin = (event) => {
    event.preventDefault();

    try {
      addAdminEmployee(form);

      setForm({
        email: "",
        password: "",
        contactName: "",
      });

      showMessage(
        "Admin account created successfully."
      );

      refresh();
    } catch (error) {
      showMessage(
        error.message ||
          "Error creating admin account.",
        "error"
      );
    }
  };

  const handleRemove = (id) => {
    try {
      removeAdmin(id);
      refresh();

      showMessage(
        "Admin account removed successfully."
      );
    } catch (error) {
      showMessage(
        error.message ||
          "Unable to remove the admin account.",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 font-display text-3xl text-navy">
          Account Settings
        </h1>

        {message && (
          <div
            className={`mb-4 rounded border p-4 text-sm ${
              messageType === "error"
                ? "border-rust/20 bg-rust/5 text-rust"
                : "border-gold/30 bg-gold/20 text-gold-deep"
            }`}
          >
            {message}
          </div>
        )}

        {/* Add Admin */}
        <div className="mb-6 rounded border border-navy/10 bg-white p-6">
          <h2 className="mb-4 font-display text-lg text-navy">
            Add Admin Employee
          </h2>

          <form
            onSubmit={handleAddAdmin}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Employee Name
                </label>

                <input
                  type="text"
                  name="contactName"
                  value={form.contactName}
                  onChange={handleChange}
                  className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Employee Email
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Temporary Password
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="rounded bg-gold px-6 py-2 font-semibold text-navy transition-colors hover:bg-gold/90"
            >
              Create Admin Account
            </button>
          </form>
        </div>

        {/* Current Admins */}
        <div className="rounded border border-navy/10 bg-white p-6">
          <h2 className="mb-4 font-display text-lg text-navy">
            Current Admins
          </h2>

          {admins.length === 0 ? (
            <p className="text-sm text-navy/60">
              No admins yet.
            </p>
          ) : (
            <div className="space-y-2">
              {admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between rounded bg-navy/5 p-3"
                >
                  <div>
                    <p className="text-sm font-medium text-navy">
                      {admin.contactName}
                    </p>

                    <p className="text-xs text-navy/60">
                      {admin.email}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(admin.id)
                    }
                    className="text-sm font-medium text-rust hover:text-rust/70"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MemberAccountView({
  user,
  updateUser,
  router,
}) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] =
    useState("success");

  const [formData, setFormData] = useState({
    contactName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    addressPhone: "",
    paymentMethod: "",
    additionalAddresses: [],
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      contactName: user.contactName || "",
      phone: user.phone || "",
      email: user.email || "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      zipCode: user.zipCode || "",
      addressPhone:
        user.addressPhone || user.phone || "",
      paymentMethod: user.paymentMethod || "",
      additionalAddresses:
        normalizeAdditionalAddresses(
          user.additionalAddresses
        ),
    });
  }, [user]);

  const showMessage = (
    text,
    type = "success",
    autoClear = true
  ) => {
    setMessage(text);
    setMessageType(type);

    if (autoClear) {
      window.setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "state"
          ? value.toUpperCase()
          : value,
    }));
  };

  const handleAddressChange = (
    index,
    field,
    value
  ) => {
    setFormData((previous) => ({
      ...previous,
      additionalAddresses:
        previous.additionalAddresses.map(
          (address, addressIndex) =>
            addressIndex === index
              ? {
                  ...address,
                  [field]:
                    field === "state"
                      ? value.toUpperCase()
                      : value,
                }
              : address
        ),
    }));
  };

  const handleAddAddress = () => {
    setFormData((previous) => ({
      ...previous,
      additionalAddresses: [
        ...previous.additionalAddresses,
        {
          id: createAddressId(),
          label: "",
          name: previous.contactName || "",
          street: "",
          city: "",
          state: "",
          zipCode: "",
          phone: "",
        },
      ],
    }));
  };

  const handleRemoveAddress = (index) => {
    setFormData((previous) => ({
      ...previous,
      additionalAddresses:
        previous.additionalAddresses.filter(
          (_, addressIndex) =>
            addressIndex !== index
        ),
    }));
  };

  const handleMakePrimary = (index) => {
    setFormData((previous) => {
      const selectedAddress =
        previous.additionalAddresses[index];

      if (!selectedAddress) {
        return previous;
      }

      const remainingAddresses =
        previous.additionalAddresses.filter(
          (_, addressIndex) =>
            addressIndex !== index
        );

      const currentPrimaryHasAddress =
        Boolean(previous.address?.trim());

      const previousPrimaryAddress = {
        id: createAddressId(),
        label: "Previous Primary",
        name: previous.contactName || "",
        street: previous.address || "",
        city: previous.city || "",
        state: previous.state || "",
        zipCode: previous.zipCode || "",
        phone:
          previous.addressPhone ||
          previous.phone ||
          "",
      };

      return {
        ...previous,
        address: selectedAddress.street || "",
        city: selectedAddress.city || "",
        state: selectedAddress.state || "",
        zipCode: selectedAddress.zipCode || "",
        addressPhone:
          selectedAddress.phone || "",
        additionalAddresses:
          currentPrimaryHasAddress
            ? [
                previousPrimaryAddress,
                ...remainingAddresses,
              ]
            : remainingAddresses,
      };
    });

    showMessage(
      'The selected address is now shown as primary. Click "Save Changes" to keep this update.',
      "success",
      false
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const cleanedAdditionalAddresses =
        formData.additionalAddresses
          .filter(
            (address) =>
              address.street.trim() ||
              address.city.trim() ||
              address.state.trim() ||
              address.zipCode.trim()
          )
          .map((address) => ({
            ...address,
            id: address.id || createAddressId(),
            label:
              address.label.trim() ||
              "Saved Address",
            name:
              address.name.trim() ||
              formData.contactName.trim(),
            street: address.street.trim(),
            city: address.city.trim(),
            state: address.state
              .trim()
              .toUpperCase(),
            zipCode: address.zipCode.trim(),
            phone: address.phone.trim(),
          }));

      const updatedProfile = {
        ...formData,
        contactName: formData.contactName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state
          .trim()
          .toUpperCase(),
        zipCode: formData.zipCode.trim(),
        addressPhone:
          formData.addressPhone.trim(),
        additionalAddresses:
          cleanedAdditionalAddresses,
      };

      await updateUser(updatedProfile);

      showMessage(
        "Profile updated successfully."
      );
    } catch (error) {
      console.error(
        "Unable to update profile:",
        error
      );

      showMessage(
        "Error updating profile. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 font-display text-3xl text-navy">
          Account Settings
        </h1>

        {message && (
          <div
            className={`mb-4 rounded border p-4 text-sm ${
              messageType === "error"
                ? "border-rust/20 bg-rust/5 text-rust"
                : "border-gold/30 bg-gold/20 text-gold-deep"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSave}
          className="space-y-6"
        >
          {/* Personal Information */}
          <div className="rounded border border-navy/10 bg-white p-6">
            <h2 className="mb-4 font-display text-lg text-navy">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Full Name
                </label>

                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Personal Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Primary Address */}
          <div
            id="addresses"
            className="scroll-mt-24 rounded border border-navy/10 bg-white p-6"
          >
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <h2 className="font-display text-lg text-navy">
                Primary Address
              </h2>

              <span className="rounded-full bg-navy px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                Checkout Default
              </span>
            </div>

            <p className="mb-4 text-xs text-navy/60">
              This address is selected by default during
              checkout.
            </p>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-navy">
                  Street Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    maxLength={2}
                    className="w-full rounded border border-navy/20 px-3 py-2 uppercase focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">
                    ZIP Code
                  </label>

                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-navy">
                    Location Phone
                  </label>

                  <input
                    type="tel"
                    name="addressPhone"
                    value={formData.addressPhone}
                    onChange={handleInputChange}
                    className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Addresses */}
          <div className="rounded border border-navy/10 bg-white p-6">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-lg text-navy">
                  Additional Addresses
                </h2>

                <p className="mt-1 text-xs text-navy/60">
                  These addresses can be selected during
                  checkout.
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddAddress}
                className="shrink-0 text-sm font-medium text-gold-deep hover:text-gold"
              >
                + Add Address
              </button>
            </div>

            {formData.additionalAddresses.length ===
            0 ? (
              <div className="rounded border border-dashed border-navy/20 p-5 text-center">
                <p className="text-sm text-navy/60">
                  No additional addresses saved.
                </p>

                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="mt-2 text-sm font-semibold text-gold-deep hover:underline"
                >
                  Add your first address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.additionalAddresses.map(
                  (address, index) => (
                    <div
                      key={address.id}
                      className="space-y-3 rounded border border-navy/10 p-4"
                    >
                      <div>
                        <label className="mb-1 block text-sm font-medium text-navy">
                          Label
                        </label>

                        <input
                          type="text"
                          placeholder="e.g., Warehouse Houston"
                          value={address.label}
                          onChange={(event) =>
                            handleAddressChange(
                              index,
                              "label",
                              event.target.value
                            )
                          }
                          className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-medium text-navy">
                          Street Address
                        </label>

                        <input
                          type="text"
                          value={address.street}
                          onChange={(event) =>
                            handleAddressChange(
                              index,
                              "street",
                              event.target.value
                            )
                          }
                          className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-navy">
                            City
                          </label>

                          <input
                            type="text"
                            value={address.city}
                            onChange={(event) =>
                              handleAddressChange(
                                index,
                                "city",
                                event.target.value
                              )
                            }
                            className="w-full rounded border border-navy/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-navy">
                            State
                          </label>

                          <input
                            type="text"
                            value={address.state}
                            onChange={(event) =>
                              handleAddressChange(
                                index,
                                "state",
                                event.target.value
                              )
                            }
                            maxLength={2}
                            className="w-full rounded border border-navy/20 px-3 py-2 text-sm uppercase focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-navy">
                            ZIP Code
                          </label>

                          <input
                            type="text"
                            value={address.zipCode}
                            onChange={(event) =>
                              handleAddressChange(
                                index,
                                "zipCode",
                                event.target.value
                              )
                            }
                            className="w-full rounded border border-navy/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block text-xs font-medium text-navy">
                            Location Phone
                          </label>

                          <input
                            type="tel"
                            value={address.phone}
                            onChange={(event) =>
                              handleAddressChange(
                                index,
                                "phone",
                                event.target.value
                              )
                            }
                            className="w-full rounded border border-navy/20 px-3 py-2 text-sm focus:border-gold focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 border-t border-navy/10 pt-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleMakePrimary(index)
                          }
                          className="text-sm font-semibold text-gold-deep hover:text-gold"
                        >
                          Make Primary
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveAddress(index)
                          }
                          className="text-sm font-medium text-rust hover:text-rust/70"
                        >
                          Remove Address
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Payment */}
          <div
            id="payment"
            className="scroll-mt-24 rounded border border-navy/10 bg-white p-6"
          >
            <h2 className="mb-4 font-display text-lg text-navy">
              Payment Method
            </h2>

            <div>
              <label className="mb-1 block text-sm font-medium text-navy">
                Preferred Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full rounded border border-navy/20 px-3 py-2 focus:border-gold focus:outline-none"
              >
                <option value="">
                  Select payment method
                </option>

                <option value="credit_card">
                  Credit Card
                </option>

                <option value="bank_transfer">
                  Bank Transfer
                </option>

                <option value="check">
                  Check
                </option>

                <option value="ach">
                  ACH
                </option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded bg-gold py-3 font-semibold text-navy transition-colors hover:bg-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded border border-navy/30 py-3 font-semibold text-navy transition-colors hover:bg-navy/5"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
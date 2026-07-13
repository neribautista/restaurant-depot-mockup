"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB per file
const MAX_FILES = 5;

const ALLOWED_EXTENSIONS = ["pdf", "csv", "zip"];

const EMPTY_FORM = {
  name: "",
  businessName: "",
  email: "",
  phone: "",
  currentSupplier: "",
  monthlySpend: "",
  message: "",
};

function getFileExtension(filename) {
  return filename.split(".").pop()?.toLowerCase() || "";
}

function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function SupplierUpdatePage() {
  const fileInputRef = useRef(null);

  const searchParams = useSearchParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState(() => ({
    ...EMPTY_FORM,
    name: searchParams.get("name") || "",
    email: searchParams.get("email") || "",
  }));

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const incomingFiles = Array.from(event.target.files || []);

    setFileError("");

    if (incomingFiles.length === 0) {
      return;
    }

    if (selectedFiles.length + incomingFiles.length > MAX_FILES) {
      setFileError(`You may upload up to ${MAX_FILES} files.`);
      event.target.value = "";
      return;
    }

    const validFiles = [];

    for (const file of incomingFiles) {
      const extension = getFileExtension(file.name);

      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        setFileError(
          `"${file.name}" is not supported. Please upload PDF, CSV, or ZIP files.`
        );
        event.target.value = "";
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileError(
          `"${file.name}" exceeds the 10 MB file-size limit.`
        );
        event.target.value = "";
        return;
      }

      const isDuplicate = selectedFiles.some(
        (existingFile) =>
          existingFile.name === file.name &&
          existingFile.size === file.size &&
          existingFile.lastModified === file.lastModified
      );

      if (!isDuplicate) {
        validFiles.push(file);
      }
    }

    setSelectedFiles((previous) => [
      ...previous,
      ...validFiles,
    ]);

    // Allows the same file to be selected again after removal.
    event.target.value = "";
  };

  const handleRemoveFile = (fileIndex) => {
    setSelectedFiles((previous) =>
      previous.filter((_, index) => index !== fileIndex)
    );

    setFileError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitError("");
    setFileError("");

    if (selectedFiles.length === 0) {
      setFileError(
        "Please attach at least one supplier invoice or purchasing file."
      );

      fileInputRef.current?.focus();
      return;
    }

    setSubmitting(true);

    try {
      /*
       * FormData supports both normal form fields and uploaded files.
       * Replace the demo behavior below with a real API call when your
       * backend is ready.
       */
      const requestData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        requestData.append(key, value);
      });

      selectedFiles.forEach((file) => {
        requestData.append("files", file);
      });

      /*
       * Example backend request:
       *
       * const response = await fetch("/api/savings-analysis", {
       *   method: "POST",
       *   body: requestData,
       * });
       *
       * if (!response.ok) {
       *   throw new Error("Unable to submit your request.");
       * }
       */

      console.log("Savings analysis request:", {
        ...formData,
        files: selectedFiles.map((file) => ({
          name: file.name,
          type: file.type,
          size: file.size,
        })),
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Unable to submit analysis request:", error);

      setSubmitError(
        error.message ||
          "Unable to submit your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-cream">
      {/* Savings process */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-deep">
              Invoice Comparison
            </p>

            <h1 className="mt-3 font-display text-3xl text-ink">
              Find Out How Much Your Restaurant Could Save
            </h1>

            <p className="mt-4 text-sm leading-7 text-ink/65">
              Savings depend on the products, quantities, brands, and
              prices shown on your current supplier invoices. A
              comparison gives you a clearer estimate than a general
              percentage.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ProcessCard
              number="01"
              title="Submit your information"
              text="Tell us about your business and current supplier."
            />

            <ProcessCard
              number="02"
              title="Upload your invoices"
              text="Attach recent PDF, CSV, or ZIP purchasing files."
            />

            <ProcessCard
              number="03"
              title="Review the comparison"
              text="See where Restaurant Depot pricing may reduce purchasing costs."
            />
          </div>
        </div>
      </section>

      {/* Analysis request form */}
      <section
        id="savings-request"
        className="scroll-mt-24 bg-cream-dark px-6 py-16"
      >
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-gold-deep">
              Complimentary Review
            </p>

            <h2 className="mt-3 font-display text-3xl text-ink">
              Request a Cost Analysis
            </h2>

            <p className="mt-4 text-sm leading-7 text-ink/65">
              Complete the form and upload a recent supplier invoice
              or purchasing report for comparison.
            </p>

            <div className="mt-7 rounded-sm border border-navy/10 bg-white p-5">
              <p className="text-sm font-semibold text-navy">
                Before uploading
              </p>

              <p className="mt-2 text-xs leading-6 text-ink/60">
                Remove payment information, bank details, account
                passwords, or other sensitive information before
                submitting your files.
              </p>

              <div className="mt-4 border-t border-navy/10 pt-4">
                <p className="text-xs font-semibold text-navy">
                  Accepted files
                </p>

                <p className="mt-1 text-xs leading-5 text-ink/60">
                  PDF, CSV, or ZIP. Maximum 10 MB per file and five
                  files per request.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-navy/10 bg-white p-6 shadow-sm md:p-8">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-2xl font-bold text-navy">
                  ✓
                </div>

                <h3 className="mt-5 font-display text-2xl text-ink">
                  Request Received
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-ink/60">
                  Your information and selected invoice files have
                  been prepared for submission.
                </p>

                <p className="mt-2 max-w-md text-xs leading-5 text-ink/50">
                  This demo currently keeps the request in the
                  browser. Connect the form to your backend to store
                  and process real uploads.
                </p>

                <Link
                  href="/products"
                  className="mt-6 rounded-sm bg-navy px-6 py-3 text-sm font-semibold uppercase tracking-widest2 text-cream hover:bg-navy-light"
                >
                  Browse Products
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField
                    label="Contact Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <FormField
                    label="Business Name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />

                  <FormField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                  <FormField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <FormField
                    label="Current Supplier"
                    name="currentSupplier"
                    value={formData.currentSupplier}
                    onChange={handleChange}
                    placeholder="e.g., Sysco"
                  />

                  <div>
                    <label
                      htmlFor="monthlySpend"
                      className="mb-1.5 block text-xs font-medium text-navy"
                    >
                      Estimated Monthly Spend
                    </label>

                    <select
                      id="monthlySpend"
                      name="monthlySpend"
                      value={formData.monthlySpend}
                      onChange={handleChange}
                      className="w-full rounded-sm border border-navy/20 bg-white px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                    >
                      <option value="">
                        Select a range
                      </option>

                      <option value="under-5000">
                        Under $5,000
                      </option>

                      <option value="5000-15000">
                        $5,000–$15,000
                      </option>

                      <option value="15000-50000">
                        $15,000–$50,000
                      </option>

                      <option value="over-50000">
                        More than $50,000
                      </option>
                    </select>
                  </div>
                </div>

                {/* File upload */}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-navy">
                    Supplier Invoices or Purchasing Files
                  </label>

                  <div
                    className={`rounded-sm border-2 border-dashed p-6 text-center transition-colors ${
                      fileError
                        ? "border-rust/50 bg-rust/5"
                        : "border-navy/20 bg-cream/40 hover:border-gold"
                    }`}
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-navy">
                      <svg
                        width="21"
                        height="21"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 3v12" />
                        <path d="m7 8 5-5 5 5" />
                        <path d="M5 21h14a2 2 0 0 0 2-2v-3" />
                        <path d="M3 16v3a2 2 0 0 0 2 2" />
                      </svg>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-navy">
                      Upload your supplier files
                    </p>

                    <p className="mt-1 text-xs text-ink/55">
                      PDF, CSV, or ZIP · Up to 10 MB each
                    </p>

                    <input
                      ref={fileInputRef}
                      id="supplier-files"
                      name="files"
                      type="file"
                      multiple
                      accept=".pdf,.csv,.zip,application/pdf,text/csv,application/zip,application/x-zip-compressed"
                      onChange={handleFileChange}
                      className="sr-only"
                    />

                    <label
                      htmlFor="supplier-files"
                      className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-sm bg-navy px-5 py-2.5 text-xs font-semibold uppercase tracking-widest2 text-cream transition-colors hover:bg-navy-light"
                    >
                      Choose Files
                    </label>
                  </div>

                  {fileError && (
                    <p
                      role="alert"
                      className="mt-2 text-xs font-medium text-rust"
                    >
                      {fileError}
                    </p>
                  )}

                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-navy">
                          Selected files
                        </p>

                        <p className="text-xs text-ink/50">
                          {selectedFiles.length}/{MAX_FILES}
                        </p>
                      </div>

                      {selectedFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${file.lastModified}`}
                          className="flex items-center justify-between gap-4 rounded-sm border border-navy/10 bg-cream/50 px-4 py-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-ink">
                              {file.name}
                            </p>

                            <p className="mt-0.5 text-xs uppercase text-ink/45">
                              {getFileExtension(file.name)} ·{" "}
                              {formatFileSize(file.size)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveFile(index)
                            }
                            className="shrink-0 text-xs font-semibold text-rust hover:text-rust/70"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-medium text-navy"
                  >
                    What would you like compared?
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your most frequently purchased products or current pricing concerns."
                    className="w-full resize-none rounded-sm border border-navy/20 px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
                  />
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="rounded-sm border border-rust/20 bg-rust/5 p-3 text-sm text-rust"
                  >
                    {submitError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-sm bg-gold py-3.5 text-sm font-semibold uppercase tracking-widest2 text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting…"
                    : "Submit Analysis Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ProcessCard({ number, title, text }) {
  return (
    <div className="rounded-sm border border-navy/10 bg-cream p-6">
      <p className="font-mono text-xs font-semibold text-gold-deep">
        {number}
      </p>

      <h3 className="mt-3 font-display text-xl text-ink">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-ink/60">
        {text}
      </p>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-medium text-navy"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-sm border border-navy/20 px-4 py-3 text-sm text-ink focus:border-gold focus:outline-none"
      />
    </div>
  );
}
const DEFAULT_TIMEOUT = 10000;

const parseTimeout = (value) => {
  const timeout = Number(value);

  return Number.isFinite(timeout) && timeout > 0 ? timeout : DEFAULT_TIMEOUT;
};

export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL?.trim() || "",
  apiTimeout: parseTimeout(import.meta.env.VITE_API_TIMEOUT),
};

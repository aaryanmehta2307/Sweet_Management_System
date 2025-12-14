const BASE_URL = "http://localhost:5000";

export const apiRequest = async (
  endpoint,
  body = null,
  method = "POST",
  isFormData = false
) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : null,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};


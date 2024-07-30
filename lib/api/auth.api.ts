export const register = async (formData: FormData) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();

  if (json.error) return { error: json.error };

  return;
};

export const login = async (formData: FormData) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    body: formData,
  });

  const json = await res.json();

  if (json.error) return { error: json.error };

  return;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const ACCESS_TOKEN_KEY = 'pridally_access_token';
const REFRESH_TOKEN_KEY = 'pridally_refresh_token';

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, data: unknown) {
    super(typeof data === 'string' ? data : JSON.stringify(data));
    this.status = status;
    this.data = data;
  }
}

export const tokenStorage = {
  getAccess: () => (typeof window === 'undefined' ? null : localStorage.getItem(ACCESS_TOKEN_KEY)),
  getRefresh: () => (typeof window === 'undefined' ? null : localStorage.getItem(REFRESH_TOKEN_KEY)),
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  setAccess: (access: string) => localStorage.setItem(ACCESS_TOKEN_KEY, access),
  clear: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

async function refreshAccessToken(): Promise<string | null> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return null;

  const res = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    tokenStorage.clear();
    return null;
  }

  const data = await res.json();
  tokenStorage.setAccess(data.access);
  return data.access as string;
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  auth?: boolean; // attach Authorization header (default true)
}

export async function apiFetch<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = true, headers, ...rest } = options;

  const doFetch = async (accessToken: string | null) => {
    const finalHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...headers,
      ...(auth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    };

    return fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  };

  let res = await doFetch(tokenStorage.getAccess());

  if (res.status === 401 && auth) {
    const newAccess = await refreshAccessToken();
    if (newAccess) {
      res = await doFetch(newAccess);
    }
  }

  if (!res.ok) {
    let data: unknown;
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }
    throw new ApiError(res.status, data);
  }

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

// ---- Auth ----

export interface AuthUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
  health_pathway: string;
  onboarding_completed: boolean;
  created_at: string;
}

export const authApi = {
  signup: (data: { email: string; first_name: string; last_name: string; password: string; password_confirm: string }) =>
    apiFetch<{ email: string; first_name: string; last_name: string }>('/api/auth/signup/', {
      method: 'POST',
      body: data,
      auth: false,
    }),

  login: async (email: string, password: string) => {
    const tokens = await apiFetch<{ access: string; refresh: string }>('/api/auth/token/', {
      method: 'POST',
      body: { email, password },
      auth: false,
    });
    tokenStorage.setTokens(tokens.access, tokens.refresh);
    return tokens;
  },

  me: () => apiFetch<AuthUser>('/api/users/me/'),

  logout: () => tokenStorage.clear(),
};

// ---- Health check-ins ----

export interface DailyCheckIn {
  id: number;
  mood: string;
  energy_level: string;
  responses: Record<string, unknown>;
  sleep_hours: number | null;
  exercise_minutes: number;
  water_intake: number;
  notes: string;
  symptoms: string;
  meals_logged: number;
  check_in_date: string;
  created_at: string;
  updated_at: string;
}

export const checkinsApi = {
  create: (data: Partial<Omit<DailyCheckIn, 'id' | 'check_in_date' | 'created_at' | 'updated_at'>>) =>
    apiFetch<DailyCheckIn>('/api/checkins/', { method: 'POST', body: data }),

  update: (id: number, data: Partial<DailyCheckIn>) =>
    apiFetch<DailyCheckIn>(`/api/checkins/${id}/`, { method: 'PATCH', body: data }),

  today: () => apiFetch<DailyCheckIn>('/api/checkins/today/').catch((err) => {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }),

  weekly: () => apiFetch<DailyCheckIn[]>('/api/checkins/weekly/'),

  stats: () => apiFetch<{
    total_checkins: number;
    average_mood: string;
    average_energy: string;
    average_sleep: number;
    total_exercise_minutes: number;
  }>('/api/checkins/stats/'),

  // Merges `responses` into today's check-in, creating it if it doesn't exist yet.
  upsertTodayResponses: async (responses: Record<string, unknown>) => {
    const existing = await checkinsApi.today();
    if (existing) {
      return checkinsApi.update(existing.id, { responses: { ...existing.responses, ...responses } });
    }
    return checkinsApi.create({ responses });
  },
};

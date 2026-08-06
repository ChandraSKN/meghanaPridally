import AsyncStorage from '@react-native-async-storage/async-storage';

// Same live Django backend the web app uses.
const API_BASE_URL = 'https://pridally-backend.onrender.com';

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
  getAccess: () => AsyncStorage.getItem(ACCESS_TOKEN_KEY),
  getRefresh: () => AsyncStorage.getItem(REFRESH_TOKEN_KEY),
  setTokens: async (access: string, refresh: string) => {
    await AsyncStorage.multiSet([
      [ACCESS_TOKEN_KEY, access],
      [REFRESH_TOKEN_KEY, refresh],
    ]);
  },
  setAccess: (access: string) => AsyncStorage.setItem(ACCESS_TOKEN_KEY, access),
  clear: () => AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]),
};

async function refreshAccessToken(): Promise<string | null> {
  const refresh = await tokenStorage.getRefresh();
  if (!refresh) return null;

  const res = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    await tokenStorage.clear();
    return null;
  }

  const data = await res.json();
  if (data.refresh) {
    await tokenStorage.setTokens(data.access, data.refresh);
  } else {
    await tokenStorage.setAccess(data.access);
  }
  return data.access as string;
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  auth?: boolean;
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

  let res = await doFetch(await tokenStorage.getAccess());

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
    await tokenStorage.setTokens(tokens.access, tokens.refresh);
    return tokens;
  },

  me: () => apiFetch<AuthUser>('/api/users/me/'),

  logout: () => tokenStorage.clear(),
};

// ---- Users ----

export const usersApi = {
  updateHealthPathway: (userId: number, healthPathway: string) =>
    apiFetch<AuthUser>(`/api/users/${userId}/`, {
      method: 'PATCH',
      body: { health_pathway: healthPathway },
    }),

  completeOnboarding: () =>
    apiFetch<{ detail: string }>('/api/users/complete_onboarding/', { method: 'POST' }),
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

  today: () =>
    apiFetch<DailyCheckIn>('/api/checkins/today/').catch((err) => {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }),

  stats: () =>
    apiFetch<{
      total_checkins: number;
      average_mood: string;
      average_energy: string;
      average_sleep: number;
      total_exercise_minutes: number;
    }>('/api/checkins/stats/').catch((err) => {
      // 404 means no check-ins in the last 30 days yet — not an error state.
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }),

  monthly: () => apiFetch<DailyCheckIn[]>('/api/checkins/monthly/'),

  upsertTodayResponses: async (responses: Record<string, unknown>) => {
    const existing = await checkinsApi.today();
    if (existing) {
      return checkinsApi.update(existing.id, { responses: { ...existing.responses, ...responses } });
    }
    return checkinsApi.create({ responses });
  },
};

// ---- Appointments ----

export interface DoctorAppointment {
  id: number;
  doctor: number;
  doctor_name: string;
  doctor_speciality: string;
  appointment_type: 'in_person' | 'video_call' | 'phone_call';
  appointment_date: string;
  appointment_time: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show' | 'rescheduled';
  reason_for_visit: string;
  location: string;
  video_call_link: string;
}

export const appointmentsApi = {
  upcoming: () => apiFetch<DoctorAppointment[]>('/api/appointments/upcoming/'),
  past: () => apiFetch<DoctorAppointment[]>('/api/appointments/past/'),

  create: (data: {
    doctor: number;
    appointment_type: DoctorAppointment['appointment_type'];
    appointment_date: string;
    appointment_time: string;
    reason_for_visit: string;
    patient_notes?: string;
  }) => apiFetch<DoctorAppointment>('/api/appointments/', { method: 'POST', body: data }),
};

// ---- Doctors ----

export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  hospital: string;
  average_rating: number;
}

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// ---- Body profile / transition timeline ----

export interface BodyProfile {
  id: number;
  height: number | null;
  weight: number | null;
  chest: number | null;
  waist: number | null;
  hip: number | null;
  transition_direction: 'feminizing' | 'masculinizing' | '';
}

export const profileApi = {
  me: () => apiFetch<BodyProfile>('/api/profiles/me/'),

  update: (data: Partial<Omit<BodyProfile, 'id'>>) =>
    apiFetch<BodyProfile>('/api/profiles/me/', { method: 'PUT', body: data }),
};

export const doctorsApi = {
  // Note: the default list endpoint is paginated server-side (PAGE_SIZE=10).
  // Only the first page is fetched — fine while there are only a handful of
  // doctors; revisit if the doctor roster ever grows past one page.
  list: async () => {
    const res = await apiFetch<PaginatedResponse<Doctor>>('/api/doctors/');
    return res.results;
  },
};

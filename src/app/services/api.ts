import { getTokenFromLocalStorage } from '@/utils/basic';

interface Bid {
  market_session: string;
  bet_digit: string;
  bet_amount: number;
  bet_type: string;
  user_id: number;
  market_id: number;
}

export interface PostBidsResponse {
  error_msg: string;
  response: 200;
  success: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://blacksattamatka.in/api/';

// Utility function to handle GET requests

export const getRequest = async <T>(
  endpoint: string,
  includeAuth: boolean = false // Add a flag to control token inclusion
): Promise<ApiResponse<T>> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Conditionally add the Authorization header if includeAuth is true
    if (includeAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: T = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

// Utility function to handle POST requests
export const postRequest = async <T, U>(
  endpoint: string,
  body: T,
  includeAuth: boolean = false // Add a flag to control token inclusion
): Promise<ApiResponse<U>> => {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Conditionally add the Authorization header if includeAuth is true
    if (includeAuth) {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: U = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export interface Market {
  id: number;
  market_id: number;
  market_name: string;
  open_pana: string;
  close_pana: string;
  open_market_status: number;
  close_market_status: number;
  market_status: number;
  market_open_time: string;
  market_close_time: string;
  is_active: number;
  saturday_status: number;
  sunday_status: number;
}

export const getMarketInfo = async (id: number): Promise<Market> => {
  try {
    const response = await fetch(`${BASE_URL}/one_market_data_2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
      body: JSON.stringify({ market_id: id }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: Market = await response.json();
    return data;
  } catch (error) {
    console.error('error:', (error as Error).message);
    throw new Error('Logout failed');
  }
};

export const postBids = async (bids: Bid[]): Promise<PostBidsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/placeBids2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ bids }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: PostBidsResponse = await response.json();
    return data;
  } catch (error) {
    console.error('error:', (error as Error).message);
    throw new Error('Logout failed');
  }
};

interface GameRates {
  id: number;
  market_name: string;
  market_rate: string;
}

export const getGameRates = async (): Promise<GameRates[]> => {
  try {
    const response = await fetch(`${BASE_URL}/game_rates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: GameRates[] = await response.json();
    return data;
  } catch (error) {
    console.error('error:', (error as Error).message);
    throw new Error('Something went wrong !');
  }
};

export interface BidsData {
  id: number;
  created_at: string;
  user_id: number;
  bet_type: string;
  is_win: number;
  bet_rate: number;
  bet_digit: string;
  market_id: number;
  bet_amount: number;
  market_session: string;
  bet_date: string;
  market_name: string;
}

export interface BidResponse {
  status: number;
  bidss: BidsData[];
}

// Define an interface for the response data
interface PaymentDetails {
  id: number;
  upi_id: string;
  min_amount: number;
  max_amount: number;
  payment_desc: string;
  business_name: string;
  withdrawal_time_title: string;
  min_withdrawal: number;
  merchant_code: string;
  max_withdrawal: number;
}

const fetchPaymentDetails = async (
  url: string
): Promise<PaymentDetails | null> => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: PaymentDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching payment details:', error);
    return null;
  }
};

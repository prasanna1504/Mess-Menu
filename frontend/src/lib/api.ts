import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export interface MenuItem {
    type: string;
    items: string[];
}

export interface DayMenu {
    day: string;
    meals: MenuItem[];
}

export interface MenuData {
    month: string;
    days: DayMenu[];
}

export const fetchCurrentMenu = async (): Promise<MenuData | null> => {
    try {
        const response = await axios.get(`${API_BASE_URL}/menu/current/`);
        return response.data.json_data;
    } catch (error) {
        console.error("Error fetching menu:", error);
        return null;
    }
};

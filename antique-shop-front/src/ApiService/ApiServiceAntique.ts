import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export class ApiService {
    token: string = ''

    setToken(token: string) {
        this.token = token
    }

    async updateItem(id: number, updatedItems: FormData) {
        try {
            const response = await axios.put(`${BASE_URL}/antiques/${id}`, updatedItems, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                    "Content-Type": "multipart/form-data"
                }
            });
            return response;
        } catch (error) {
            console.error('Error updateing item', error);
            throw error;
        }
    }

    async createItem(updatedItems: FormData) {
        try {
            const response = await axios.post(`${BASE_URL}/antiques`, updatedItems, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                    "Content-Type": "multipart/form-data"
                }
            });
            return response;
        } catch (error) {
            console.error('Error creating item', error);
            throw error;
        }
    }

    async getAllInformationAboutItemById(itemId: number) {
        try {
            const response = await axios.post(`${BASE_URL}/businessLogic`, {itemId}, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error) {
            console.error('Error creating item', error);
            throw error;
        }
    }

    async deleteItem(id: number) {
        try {
            const response = await axios.delete(`${BASE_URL}/antiques/${id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error) {
            console.error('Error deleting item:', error);
            throw error;
        }
    }

    async login(username: string, password: string) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/signin`, { username, password },{
                headers: {
                    'bypass-tunnel-reminder': 'true',
                }
            });
            this.token = response.data.token
            return response.data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async register(username: string, password: string) {
        try {
            const response = await axios.post(`${BASE_URL}/auth/register`, { username, password }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error: any) {
            console.log('Error updateing item', error);
            throw error
        }
    }

    async updateUser(autoBidBalance: number, notificationParcentage: number) {
        try {
            console.log(autoBidBalance)
            const response = await axios.put(`${BASE_URL}/auth/`, { autoBidBalance, notificationParcentage }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error) {
            console.error('Error updateing item', error);
            throw error;
        }
    }

    async isTokenValid() {
        try {
            const response = await axios.post(`${BASE_URL}/antiques/isTokenValid`, {}, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error token validation:', error);
            throw error;
        }
    }

    async getPaginatedListAndSearch(limit: number, offset: number, sort: 'ASC' | 'DESC', name?: string) {
        try {
            const response = await axios.post(`${BASE_URL}/antiques/paginatedListAndSearch`, { limit, offset, sortOrder: sort, name }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error geting list', error);
            throw error;
        }
    }

    async getUserById() {
        try {
            const response = await axios.get(`${BASE_URL}/auth/`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error) {
            console.error('Error updateing item', error);
            throw error;
        }
    }

    async autoBidOn(antiqueId: number) {
        try {
            const response = await axios.post(`${BASE_URL}/autoBids/autoBidOn`, { antiquesId: antiqueId }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error: any) {
            console.log('Error updateing item', error);
            throw error
        }
    }

    async autoBidOff(antiqueId: number) {
        try {
            const response = await axios.post(`${BASE_URL}/autoBids/autoBidOff`, { antiquesId: antiqueId }, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error: any) {
            console.log('Error updateing item', error);
            throw error
        }
    }

    async getLastBidsByUserIdList() {
        try {
            const response = await axios.post(`${BASE_URL}/bids/getLastBidsByUserId`, {}, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'bypass-tunnel-reminder': 'true',
                }
            });
            return response;
        } catch (error: any) {
            console.log('Error updateing item', error);
            throw error
        }
    }
}

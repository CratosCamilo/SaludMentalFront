export interface AuthResponse {
    body: {
        role: any;
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}
export interface AuthResponseError {
    body: {
        error: string;
    };
}

export interface User {
    _id: string;
    name: string;
    username: string;
}

export interface AccessTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}
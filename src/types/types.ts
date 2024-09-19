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
    _id: string;             // Asumido como el ID del usuario
    username: string;       // Corresponde a CC
    name: string;           // Corresponde a nombreUsuario
    lastName: string;       // Corresponde a apellidoUsuario
    email: string;          // Corresponde a emailUsuario
    password: string;       // Corresponde a pwdUsuario
    sedeId: number;         // Corresponde a idSede
    roleId: number;         // Corresponde a idRol
    status: number;         // Corresponde a estadoUsuario
    specialtyId: number;   // Corresponde a idEspecialidad (opcional)
    lifeSheetId: number;   // Corresponde a idHoja_Vida (opcional)
    patientTypeId: number;  // Corresponde a idTipoPaciente
}


export interface AccessTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}
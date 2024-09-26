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
    username: number;       // Corresponde a CC
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
export interface UserAdmin {
    CC: number;       // Corresponde a CC
    nombreUsuario: string;           // Corresponde a nombreUsuario
    apellidoUsuario: string;       // Corresponde a apellidoUsuario
    emailUsuario: string;          // Corresponde a emailUsuario
    idSede: number;         // Corresponde a idSede
    idRol: number;         // Corresponde a idRol
    estadoUsuario: number;         // Corresponde a estadoUsuario
    idEspecialidad: number;   // Corresponde a idEspecialidad (opcional)
    idHoja_Vida: number;   // Corresponde a idHoja_Vida (opcional)
    idTipoPaciente: number;  // Corresponde a idTipoPaciente
}


export interface AccessTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}
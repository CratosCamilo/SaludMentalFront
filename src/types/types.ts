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
    CC: number;
    nombreUsuario: string;
    apellidoUsuario: string;
    emailUsuario: string;
    pwdUsuario: string;
    idSede: number;
    idRol: number;
    estadoUsuario: number;
    idEspecialidad: number;
    idHoja_Vida: number;
    idTipoPaciente: number;
}

export interface Cita {
    idCita: number;            
    idDocCC: number;          
    idServicio: number;       
    idUsuarioCC: number;        
    dia: Date;                 
    hora: string;              
    estadoCita: number;          
    nombrePaciente: string;     
    apellidoPaciente: string;     
    nombreDoctor: string;       
    apellidoDoctor: string;       
    nombreServicio: string;      
}

export interface CitaDoctor{
    idCita: number;            
    idDocCC: number;          
    idServicio: number;       
    idUsuarioCC: number;        
    dia: Date;                 
    hora: string;              
    estadoCita: number;          
    nombrePaciente: string;     
    apellidoPaciente: string;     
    nombreDoctor: string;       
    apellidoDoctor: string;       
    nombreServicio: string;
}

export interface Facturas {
    montoTotal: any;
    idFactura: number;
    idCita:number; 
    estadoFE:string;
    idColilla_Pago:number; 
    idAutorizacion_Medica:number; 
    idOrden_Medica:number;
    servicioPago: string;
}

export interface UserPacient {
    _id: string;             // Asumido como el ID del usuario
    username: number;       // Corresponde a CC
    name: string;           // Corresponde a nombreUsuario
    lastName: string;       // Corresponde a apellidoUsuario
    email: string;          // Corresponde a emailUsuario
    password: string;       // Corresponde a pwdUsuario
    status: number;         // Corresponde a estadoUsuario
    direccion: string;
    phone: number;
}

export interface pagoDebito {
    numeroT: number;
    nombreApellido: string;
    fechaVencimiento: Date;
    codSeguridad: number;
    tipoDoc: string;
    numeroDoc: number;
}


export interface AccessTokenResponse {
    statusCode: number;
    body: {
        accessToken: string;
    };
    error?: string;
}
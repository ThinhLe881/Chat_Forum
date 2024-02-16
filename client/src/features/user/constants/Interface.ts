interface AuthenticationFormHook {
    inputState: { [id: string]: string };
    errorState: { [id: string]: string };
    apiSuccess: boolean;
    apiStatus: string;
    loading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRegister: (e: React.FormEvent<HTMLFormElement>) => void;
}

export type { AuthenticationFormHook };
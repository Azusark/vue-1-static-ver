export interface UserState {
    token: string | null;
    
}

import { reqLogin } from "@/api/user";
import type {
    loginForm

} from "@/api/user/type";

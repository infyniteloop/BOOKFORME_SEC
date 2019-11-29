export class SignUpInfo {
    name: string;
    username: string;
    email: string;
    role: string[];
    password: string;
    locationid: string;

    constructor(name: string, username: string, email: string, password: string,locationid: string) {
       
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.locationid = locationid;
        this.role = ['user'];
    }
}


export interface User {
    cell?:       string;
    dob?:        Dob;
    email?:      string;
    gender?:     string;
    id?:         string|number;
    location?:   Location;
    login?:      Login;
    name?:       Name;
    nat?:        string;
    phone?:      string;
    imgUrl?:    string;
    registered?: Dob;
    balance?: number;
    portfolio?: UserStock[];
    contacts?: any[]

}

export interface Dob {
    age:  number;
    date: string;
}


export interface Location {
    city:        string;
    coordinates: Coordinates;
    postcode:    string;
    state:       string;
    street:      string;
    timezone:    Timezone;
}

export interface Coordinates {
    latitude:  string;
    longitude: string;
}

export interface Timezone {
    description: string;
    offset:      string;
}

export interface Login {
    md5:      string;
    password: string;
    salt:     string;
    sha1:     string;
    sha256:   string;
    username: string;
    uuid:     string;
}

export interface Name {
    first: string;
    last:  string;
    title: string;
}

export interface UserStock {
    symbol: string;
    name: string;
    amount: number
    stockData: Array<any>
}


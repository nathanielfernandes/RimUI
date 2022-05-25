import { writable, readable, Writable } from 'svelte/store';

function get(key: string, def: any = "", parse: boolean = false): any {
    const value = localStorage.getItem(key);
    if (!parse) return value || def;
    if (value === null) return def;
    return JSON.parse(value);
}

const storedMode: string = get("mode", "light");
export const mode = writable(storedMode);
mode.subscribe((value) => {
    localStorage.setItem("mode", value)
});

const storedToken: string = get("token");
export const token = writable(storedToken);
token.subscribe((value) => {
    localStorage.setItem("token", value)
});


// export const endpoint = readable("http://localhost:80");
// export const cdn_endpoint = readable("http://localhost:80");
export const endpoint = readable("https://rim.ncp.nathanferns.xyz");
export const cdn_endpoint = readable("https://rimu.b-cdn.net");

export const modal = writable(null);
export const editing = writable("");


export const images: Writable<Array<string>> = writable([]);
export function fetch_images(endpoint: string, token: String) {
    images.set([]);
    fetch(`${endpoint}/list/imgs/${token}`).then((res) =>
        res.json().then(data => {
            images.set(data);
        })
    )
}

export function delete_image(endpoint: string, token: string, id: string) {
    fetch(`${endpoint}/imgs/${id}/${token}`, {
        method: "DELETE"
    }).then(_ => {
        fetch_images(endpoint, token)
    })
}


export function rename_image(endpoint: string, token: string, id: string, new_id: string) {
    if (id !== new_id) {
        fetch(`${endpoint}/imgs/${id}/${new_id}/${token}`, {
            method: "PATCH"
        }).then(_ => {
            fetch_images(endpoint, token)
        })
    }
}


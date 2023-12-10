export default function authHeader() {
    let accessToken = JSON.parse(sessionStorage.getItem('token'));
    return accessToken ? `Bearer ${accessToken}` : '';
}

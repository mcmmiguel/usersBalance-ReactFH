
/**
 * 
 * @param {String | Number} id 
 * @return {Promise<User[]>}
 */
export const getUserById = async (id) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;
    const resp = await fetch(url);

    const data = await resp.json();

    const users = localhostUserToModel(data);

    return users;
}
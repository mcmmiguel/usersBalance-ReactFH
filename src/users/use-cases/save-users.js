import { userModelToLocalHost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async (userLike) => {

    const user = new User(userLike);

    if (!user.firstName || !user.lastName) throw 'Hay campos sin llenar'

    const userToSave = userModelToLocalHost(user);

    if (user.id) {
        throw 'No implementado';
    }

    const updatedUser = await createUser(userToSave);
    return updatedUser;

};

/**
 * @param {Like<User>}
 */
const createUser = async (user) => {

    const url = `${import.meta.env.VITE_BASE_URL}/users`;

    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const newUser = await resp.json();
    console.log(newUser);

    return newUser;

}
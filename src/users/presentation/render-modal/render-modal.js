import modalHTML from './render-modal.html?raw';
import './render-modal.css'
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;
let loaderUser = {};

/**
 * 
 * @param {String | Number} id 
 */
export const showModal = async (id) => {
    modal?.classList.remove('hide-modal');

    if (!id) return;

    const user = await getUserById(id);
    setFormValues(user);

};

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    modal?.reset();
};

/**
 * 
 * @param {User} user 
 */
const setFormValues = (user) => {
    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').value = user.isActive;

    loaderUser = user;
};


/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */
export const renderModal = (element, callback) => {

    if (modal) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHTML;
    modal.className = 'modal-container hide-modal';

    form = modal.querySelector('form');

    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container') {
            hideModal();
        };
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log(event);

        const formData = new FormData(form);
        const userLike = { ...loaderUser };

        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = +value;
                continue;
            }

            if (key === 'isActive') {
                userLike[key] = (value === 'on') ? true : false;
                continue;
            }

            userLike[key] = value;

        }

        await callback(userLike);
        hideModal();

    })

    element.append(modal);

}
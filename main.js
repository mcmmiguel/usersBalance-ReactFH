import './style.css'
import { UsersApp } from './src/users/users-app'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>USERS BALANCE CONTROL - CRUD</h1>
    <div class="card container">
    </div>
  </div>
`

const element = document.querySelector('.card');

// setupCounter(document.querySelector('#counter'))
// BreakingBadApp(element)
UsersApp(element);

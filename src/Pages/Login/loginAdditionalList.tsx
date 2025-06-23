export const loginSvgListList = {
    phone: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="svg-inline--fa fa-mobile-alt fa-w-10"
            role="img"
            viewBox="0 0 320 512"
            id="icon-mobile"
        >
            <path
                fill="currentColor"
                d="M272 0H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zM160 480c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm112-108c0 6.6-5.4 12-12 12H60c-6.6 0-12-5.4-12-12V60c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v312z"
            >
            </path>
        </svg>
    ),
    email: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="svg-inline--fa fa-envelope fa-w-16"
            role="img"
            viewBox="0 0 512 512"
            id="icon-mail"
        >
            <path
                fill="currentColor"
                d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
            >
            </path>
        </svg>
    ),
    password: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            viewBox="0 0 448 512"
            className="svg-inline--fa fa-lock-alt fa-w-14 fa-7x"
            id="icon-lock"
        >
            <path
                fill="currentColor"
                d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zM264 392c0 22.1-17.9 40-40 40s-40-17.9-40-40v-48c0-22.1 17.9-40 40-40s40 17.9 40 40v48zm32-168H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                className=""
            >
            </path>
        </svg>
    ),
}
export const loginShow = [{ state: true, name: '手机号登录' }, { state: true, name: '邮箱登录' }, {
    state: false,
    name: '二维码登录',
}]
export const loginValue = [{
    name: 'phone',
    value: '',
    placeholder: '手机号',
}, { name: 'email', value: '', placeholder: '邮箱' }, {
    name: 'password',
    value: '',
    placeholder: '密码',
}, { name: 'fontPhone', value: '+86' }]
export const loginFocus = [{ name: '手机号', show: false }, { name: '邮箱', show: false }, {
    name: '密码',
    show: false,
}]

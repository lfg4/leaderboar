import firebase from './firebase.js';

class OxLeaderBoard {
    studioFrame;

    experienceUrl = "https://studio.onirix.com/projects/8721b3088abb44ea83f87dd972e3b3b5/webar?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMjgwLCJwcm9qZWN0SWQiOjUyNDA1LCJyb2xlIjozLCJpYXQiOjE2OTI3MDUxMDF9.7OgQHOLBUGpnqHdMo_j29C2-okgyDqgWlQHSK13Qpl0&background=alpha&preview=false&hide_controls=false&ar_button=false";
    firebaseController = new firebase.FirebaseController();
    userData;
    userCredential;


    main = document.getElementById("oex-main");
    leaderboard = document.querySelector(".oex-leaderboard");
    landing = document.getElementById('oex-landing');
    registerForm = document.querySelector('.oex-register-form');
    loginForm = document.querySelector('.oex-login-form');
    registerButton = document.getElementById('oex-register');
    loginButton = document.getElementById('oex-login');
    erMsg = document.createElement('p');

    userSVG = `<svg width="10" height="12" viewBox="0 0 10 12" xmlns="http://www.w3.org/2000/svg"><g fill="#580088" fill-rule="evenodd"><path d="M5.055 5.928c1.584 0 2.872-1.33 2.872-2.964S6.64 0 5.055 0C3.47 0 2.182 1.33 2.182 2.964c0 1.635 1.289 2.964 2.873 2.964M5 6.24c-2.757 0-5 2.315-5 5.16 0 .331.26.6.582.6h8.836a.591.591 0 0 0 .582-.6c0-2.845-2.243-5.16-5-5.16"/></g></svg>`;

    constructor() {
        console.log(document.getElementById("leaderboard"))
        document.appendChild(document.getElementById("leaderboard"))
        window.addEventListener("message", (ev) => this.processMessage(ev));
        this.erMsg.classList.add('oex-error');
        document.getElementById('oex-gotoregister').onclick = this.toggleForms;
        document.getElementById('oex-gotologin').onclick = this.toggleForms;

        document.getElementById('oex-play').onclick = this.checkCredentials;
    }
    /**
     * Create the iframe that will link the experience
     * onload send a message with user's data.
     */
    loadExperience() {
        this.studioFrame = document.getElementById("oex-frame")
        if (null == this.studioFrame) {
            this.studioFrame = document.createElement('iframe');
            this.studioFrame.id = "studioFrame";
            this.studioFrame.allow = "autoplay;camera;gyroscope;accelerometer;magnetometer;fullscreen;xr-spatial-tracking;geolocation;";
            document.body.appendChild(this.studioFrame);
        }
        this.studioFrame.src = this.experienceUrl;
        this.main.classList.add("oex-hide");
    }

    /**
     * Check if there is already a logged user
     * If there is, retrieve its data and go to the experience.
     * If there isn't go to register.
     */
    checkCredentials() {
        this.userCredential = JSON.parse(localStorage.getItem("oex-user"));
        if (this.userCredential) {
            this.getUserData().then(() => this.loadExperience());
        } else {
            this.landing.classList.add('oex-hide');
            this.registerForm.classList.remove('oex-hide');
            this.registerButton.onclick = this.register;
            this.loginButton.onclick = this.login;
        }
    }

    /**
     * 
     */
    register() {
        const form = document.querySelector('.oex-register-form form');
        if (form.checkValidity() === true) {
            const user = {
                email: document.getElementById('oex-email').value,
                name: document.getElementById('oex-name').value,
                nickname: document.getElementById('oex-nickname').value,
                password: document.getElementById('oex-password').value,
                newsletter: document.getElementById('oex-newsletter').value
            }

            try {
                this.registerForm.removeChild(erMsg);
            } catch (e) { }

            this.registerButton.setAttribute('disabled', true);
            this.firebaseController.register(user.email, user.password).then(async credentials => {
                this.setUserCredentials(credentials.user)

                this.userData = user;
                delete this.userData.password;
                this.userData.score = 0;
                this.userData.uuid = this.userCredential.uid;

                await this.insertUserData();
                this.loadExperience();
                this.registerButton.removeAttribute('disabled');
            }).catch(err => {
                console.error(err);
                this.erMsg.textContent = err.code === "auth/email-already-in-use" ?
                    "The provided email is already in use" : "An error ocurred. Please, try again later";
                form.appendChild(this.erMsg);
                this.registerButton.removeAttribute('disabled');
            });
        } else {
            form.classList.add('oex-submitted');
        }
    }

    /**
     * 
     */
    login() {
        const form = document.querySelector('.oex-login-form form');
        if (form.checkValidity() === true) {
            const user = {
                email: document.getElementById('oex-login-email').value,
                password: document.getElementById('oex-login-password').value
            }

            try {
                this.loginForm.removeChild(erMsg);
            } catch (e) { }

            this.loginButton.setAttribute('disabled', true);
            this.firebaseController.login(user.email, user.password).then(async credentials => {
                this.setUserCredentials(credentials.user)
                this.userData = await this.getUserData();
                this.loadExperience();
                this.loginButton.removeAttribute('disabled');
            }).catch(err => {
                console.error(err);
                this.erMsg.textContent = err.code === "auth/user-not-found" ?
                    "No user registered with the given email" : "An error ocurred. Please, try again later";
                form.appendChild(this.erMsg);
                this.loginButton.removeAttribute('disabled');
            });
        } else {
            form.classList.add('oex-submitted');
        }
    }

    /**
     * Calls firebase to retrieve the user
     * @returns UserData
     */
    async getUserData() {
        this.userData = await this.firebaseController.getUser(this.userCredential.uid);
        return this.userData;
    }

    /**
     * Inserts the user in firebase
     * @returns
     */
    async insertUserData() {
        return await this.firebaseController.insertUser(this.userData);
    }

    /**
     * Process the end of game message from the experience.
     * Navigate to the leaderboard when processed.
     * @param {*} event containing the new score
     */
    processMessage(event) {
        if (event.origin != "https://studio.onirix.com") {
            return;
        }

        if (event.data != null && event.data.score != null) {
            if (!this.userData.score || this.userData.score < event.data.score) {
                this.userData.score = event.data.score;
                this.firebaseController.updateUser(this.userData).then(() => this.getLeaderboard().then());
            } else {
                this.getLeaderboard().then();
            }
        } else {
            // First communication comes from the experience after it loads
            // When loaded, send the user's data.
            this.studioFrame.contentWindow.postMessage({
                leaderboardEvent: 'sendUserData',
                userData: JSON.stringify(this.userData)
            }, "*");
        }
    }

    async getLeaderboard() {
        // UI
        this.main.classList.remove('oex-hide');
        this.registerForm.classList.add('oex-hide');
        this.loginForm.classList.add('oex-hide');
        this.landing.classList.add('oex-hide');
        this.studioFrame.classList.add('oex-hide');
        this.leaderboard.classList.remove('oex-hide');
        const list = document.querySelector('.oex-leaderboard__list')
        const ul = document.createElement('ul');

        // getData
        const users = await this.firebaseController.getAllUsers();
        let lastScore = Number.MAX_SAFE_INTEGER;
        let lastIndex = 1;
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const li = document.createElement('li');

            const num = document.createElement('span');
            const name = document.createElement('span');
            const score = document.createElement('span');

            if (Math.trunc(user.score) !== lastScore) {
                lastScore = Math.trunc(user.score);
                lastIndex = i + 1;
            }

            num.textContent = lastIndex + 'º';
            name.textContent = user.nickname;
            score.textContent = lastScore;

            if (user.email === userData.email) {
                const span = document.createElement("span");;
                span.innerHTML = this.userSVG.trim();
                li.classList.add('oex-currentuser');
                li.append(num, name, span.firstChild, score);
            } else {
                li.append(num, name, score);
            }

            ul.appendChild(li);
        }

        list.appendChild(ul);

        document.getElementById('oex-playagain').onclick = () => {
            list.innerHTML = "";
            this.loadExperience();
        }
    }

    setUserCredentials(credentials) {
        localStorage.setItem('oex-user', JSON.stringify(credentials));
        this.userCredential = credentials;
    }

    toggleForms() {
        this.registerForm.classList.toggle('oex-hide');
        this.loginForm.classList.toggle('oex-hide');
    }

    show() {
        console.log('entra')
        
    }

    
}

export default {
    OxLeaderBoard
}